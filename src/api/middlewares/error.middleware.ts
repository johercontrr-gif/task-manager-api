import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError, NotFoundError } from "../../errors/app.error";

/**
 * Middleware para capturar rutas no existentes y transformarlas en un NotFoundError (404).
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new NotFoundError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

/**
 * Middleware global de manejo de errores de Express.
 * Centraliza la respuesta hacia el cliente garantizando:
 * 1. Formato JSON consistente: { status: "error", message, details? }.
 * 2. Manejo de errores operacionales (AppError) con su codigo HTTP adecuado.
 * 3. Captura de errores de sintaxis JSON (body-parser).
 * 4. Ocultamiento de stack traces y detalles tecnicos en errores 500 no controlados.
 */
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // 1. Error de sintaxis en el cuerpo JSON (ej. JSON malformado enviado por el cliente)
  if (err instanceof SyntaxError && "status" in err && (err as { status: number }).status === 400 && "body" in err) {
    res.status(400).json({
      status: "error",
      message: "El cuerpo de la peticion contiene un JSON con formato invalido",
    });
    return;
  }

  // 2. Errores operacionales controlados (AppError y subclases)
  if (err instanceof AppError) {
    const responseBody: { status: string; message: string; details?: unknown } = {
      status: "error",
      message: err.message,
    };
    if (err.details !== undefined) {
      responseBody.details = err.details;
    }
    res.status(err.statusCode).json(responseBody);
    return;
  }

  // 3. Errores desconocidos o no controlados (500)
  // Se registra el stack internamente en el servidor, pero NUNCA se envia al cliente.
  console.error("ERROR NO CONTROLADO:", err);

  res.status(500).json({
    status: "error",
    message: "Error interno del servidor",
  });
};
