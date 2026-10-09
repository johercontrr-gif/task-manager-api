import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { Config } from "../../config/config";

export interface RateLimiterOptions {
  windowMs?: number;
  max?: number;
}

/**
 * Crea una instancia de rate limiter para rutas de autenticacion con umbrales configurables.
 * Permite sobreescribir windowMs y max para pruebas automatizadas deterministas.
 */
export function createAuthRateLimiter(options?: RateLimiterOptions): RateLimitRequestHandler {
  const config = Config.getInstance();
  return rateLimit({
    windowMs: options?.windowMs ?? config.rateLimitWindowMs,
    max: options?.max ?? config.rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: "error",
      message: "Demasiadas solicitudes desde esta direccion IP, por favor intente nuevamente mas tarde",
    },
  });
}

/**
 * Middleware de limitacion de tasa (Rate Limiting) por defecto para rutas de autenticacion (/auth/*).
 * Protege contra ataques de fuerza bruta en registro y login.
 * Umbrales configurables via Config (RATE_LIMIT_WINDOW_MS y RATE_LIMIT_MAX_REQUESTS).
 */
export const authRateLimiter: RateLimitRequestHandler = createAuthRateLimiter();
