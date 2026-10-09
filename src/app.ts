import express from "express";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./api/middlewares/error.middleware";
import authRouter from "./api/routes/auth.routes";
import taskRouter from "./api/routes/task.routes";

/**
 * Configuracion de la aplicacion Express.
 * Se definen middlewares de seguridad transversales, rutas y manejador global de errores.
 * No ejecuta `listen()` para permitir que los tests de integracion (Supertest)
 * importen directamente la aplicacion sin ocupar puertos.
 */
const app = express();

// Seguridad en cabeceras HTTP
app.use(helmet());

// Limite de tamano en peticiones JSON para prevenir ataques de denegacion de servicio (DoS)
app.use(express.json({ limit: "10kb" }));

// Ruta de verificacion de estado de la API
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
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
