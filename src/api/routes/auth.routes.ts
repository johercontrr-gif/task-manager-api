import { Router } from "express";
import { authController } from "../../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../../schemas/auth.schema";

const router = Router();

/**
 * Ruta para registro de nuevos usuarios.
 * Valida el cuerpo contra registerSchema (AJV) antes de ejecutar el controlador.
 */
router.post("/register", validate(registerSchema), authController.register);

export default router;
