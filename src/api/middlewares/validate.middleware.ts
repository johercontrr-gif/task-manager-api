import { Request, Response, NextFunction } from "express";
import Ajv, { AnySchema } from "ajv";
import addFormats from "ajv-formats";
import { ValidationError } from "../../errors/app.error";

/**
 * Instancia compartida de AJV configurada para recopilar todos los errores
 * y no permitir propiedades adicionales sin declaracion explicita.
 */
const ajv = new Ajv({
  allErrors: true,
  removeAdditional: false,
});
addFormats(ajv);

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

/**
 * Middleware de orden superior para validar el cuerpo (body) de las peticiones
 * contra un esquema JSON Schema / AJV.
 *
 * Si los datos son validos, continua al siguiente middleware o controlador.
 * Si fallan, lanza un ValidationError (HTTP 400) con la lista detallada de errores.
 */
export function validate(schema: AnySchema) {
  const validateFn = ajv.compile(schema);

  return (req: Request, _res: Response, next: NextFunction): void => {
    const valid = validateFn(req.body);

    if (!valid && validateFn.errors) {
      const details: ValidationErrorDetail[] = validateFn.errors.map((err) => {
        const field =
          err.instancePath.replace(/^\//, "") ||
          (err.params?.missingProperty as string) ||
          (err.params?.additionalProperty as string) ||
          "body";

        return {
          field,
          message: err.message || "Campo invalido",
        };
      });

      next(new ValidationError("Error de validacion en los datos de entrada", details));
      return;
    }

    next();
  };
}
