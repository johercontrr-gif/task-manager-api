import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler, notFoundHandler } from "./api/middlewares/error.middleware";
import authRouter from "./api/routes/auth.routes";
import taskRouter from "./api/routes/task.routes";

/**
 * Configuracion de la aplicacion Express.
 * Se definen middlewares de seguridad transversales, documentacion Swagger,
 * rutas y manejador global de errores.
 * No ejecuta `listen()` para permitir que los tests de integracion (Supertest)
 * importen directamente la aplicacion sin ocupar puertos.
 */
const app = express();

// Seguridad en cabeceras HTTP (deshabilita CSP para permitir renderizado interactivo de Swagger UI)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Limite de tamano en peticiones JSON para prevenir ataques de denegacion de servicio (DoS)
app.use(express.json({ limit: "10kb" }));

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Estado operacional de la API
 *     description: Endpoint publico de monitoreo que confirma que el servicio se encuentra activo.
 *     tags:
 *       - Sistema
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Documentacion interactiva de la API con Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Especificacion OpenAPI en formato JSON crudo
app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Rutas de autenticacion
app.use("/auth", authRouter);

// Rutas de tareas protegidas por JWT
app.use("/tasks", taskRouter);

// Manejador para rutas inexistentes (404)
app.use(notFoundHandler);

// Manejador global centralizado de errores
app.use(errorHandler);

export default app;
