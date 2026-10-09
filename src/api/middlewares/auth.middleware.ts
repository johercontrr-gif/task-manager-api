import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../../config/config";
import { AuthenticationError } from "../../errors/app.error";
import { JwtPayload } from "../../types/user.types";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

/**
 * Type guard que valida la estructura de la carga util decodificada del JWT.
 * Asegura en tiempo de ejecucion que el token contenga un userId numerico.
 */
function isJwtPayload(decoded: unknown): decoded is JwtPayload {
  return (
    typeof decoded === "object" &&
    decoded !== null &&
    "userId" in decoded &&
    typeof (decoded as Record<string, unknown>).userId === "number"
  );
}

/**
 * Middleware de autenticacion JWT.
 * - Extrae el token del encabezado 'Authorization: Bearer <token>'.
 * - Verifica la firma con la clave secreta y forzando el algoritmo HS256.
 * - Valida la estructura del payload mediante un type guard estricto.
 * - Asigna req.userId para consumo de controladores y rutas protegidas.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AuthenticationError("Token de autenticacion no proporcionado o formato invalido")
    );
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return next(new AuthenticationError("Token de autenticacion vacio"));
  }

  const config = Config.getInstance();

  try {
    const decoded = jwt.verify(token, config.jwtSecret, {
      algorithms: ["HS256"],
    });

    if (!isJwtPayload(decoded)) {
      return next(new AuthenticationError("Formato de carga util del token invalido"));
    }

    req.userId = decoded.userId;
    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AuthenticationError("El token de autenticacion ha expirado"));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AuthenticationError("Token de autenticacion invalido o malformado"));
    }

    return next(error);
  }
}
