import { Router } from "express";
import { authController } from "../../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { authRateLimiter } from "../middlewares/rate-limit.middleware";
import { loginSchema, registerSchema } from "../../schemas/auth.schema";

const router = Router();

// Limitacion de tasa para mitigar ataques de fuerza bruta
router.use(authRateLimiter);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     description: Registra una nueva cuenta de usuario con contraseña protegida mediante hash bcrypt.
 *     tags:
 *       - Autenticacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDTO'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validacion en los campos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflicto, el correo electronico ya esta registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Inicio de sesion de usuario
 *     description: Verifica credenciales de acceso y retorna un token JWT firmado con algoritmo HS256.
 *     tags:
 *       - Autenticacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       200:
 *         description: Inicio de sesion exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error de validacion en los datos de entrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciales invalidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", validate(loginSchema), authController.login);

export default router;
