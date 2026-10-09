/**
 * Clase base para todos los errores operacionales de la aplicacion.
 * Los errores que heredan de AppError son conocidos y controlados,
 * por lo que devuelven un codigo HTTP y un mensaje especifico al cliente.
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly details?: unknown;
  readonly isOperational: boolean;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/** Error 400: Datos de entrada invalidos (fallo de validacion de esquema, id invalido, etc.). */
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
  }
}

/** Error 401: Fallo de autenticacion (credenciales incorrectas, token ausente o expirado). */
export class AuthenticationError extends AppError {
  constructor(message = "Credenciales incorrectas") {
    super(message, 401);
  }
}

/** Error 403: Acceso prohibido a un recurso (permisos insuficientes). */
export class ForbiddenError extends AppError {
  constructor(message = "Acceso no autorizado al recurso") {
    super(message, 403);
  }
}

/** Error 404: Recurso no encontrado. */
export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

/** Error 409: Conflicto de estado (por ejemplo, email ya registrado). */
export class ConflictError extends AppError {
  constructor(message = "El recurso ya existe o genera un conflicto") {
    super(message, 409);
  }
}
