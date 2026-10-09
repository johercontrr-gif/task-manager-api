import rateLimit from "express-rate-limit";
import { Config } from "../../config/config";

/**
 * Middleware de limitacion de tasa (Rate Limiting) para rutas de autenticacion (/auth/*).
 * Protege contra ataques de fuerza bruta en registro y login.
 * Umbrales configurables via Config (RATE_LIMIT_WINDOW_MS y RATE_LIMIT_MAX_REQUESTS).
 */
export const authRateLimiter = rateLimit({
  windowMs: Config.getInstance().rateLimitWindowMs,
  max: Config.getInstance().rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Demasiadas solicitudes desde esta direccion IP, por favor intente nuevamente mas tarde",
  },
});
