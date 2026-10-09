import { Router } from "express";
import { authController } from "../../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../../schemas/auth.schema";

const router = Router();

/**
 * Ruta para registro de nuevos usuarios.
 * Valida el cuerpo contra registerSchema (AJV) antes de ejecutar el controlador.
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * Ruta para inicio de sesion (login).
 * Valida el cuerpo contra loginSchema (AJV) antes de ejecutar el controlador.
 */
router.post("/login", validate(loginSchema), authController.login);

export default router;
