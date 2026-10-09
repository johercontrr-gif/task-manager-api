import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { validate, validateIdParam } from "../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../../schemas/task.schema";
import { taskController } from "../../controllers/task.controller";

/**
 * Enrutador para la gestion de tareas (/tasks).
 * Todas las rutas de este router requieren autenticacion previa mediante JWT.
 */
const taskRouter = Router();

// Protege todas las rutas de tareas con el middleware de autenticacion
taskRouter.use(authenticate);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una tarea asociada exclusivamente al usuario autenticado via token JWT.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDTO'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error de validacion en los datos de la tarea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado o token JWT invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
taskRouter.post("/", validate(createTaskSchema), taskController.create);

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Listar todas las tareas del usuario
 *     description: Retorna la lista de tareas pertenecientes exclusivamente al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de tareas obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autenticado o token JWT invalido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
taskRouter.get("/", taskController.getAll);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Retorna el detalle de una tarea si pertenece al usuario autenticado. Si no existe o pertenece a otro usuario, responde 404 (mitigacion IDOR).
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 2147483647
 *         description: Identificador numerico de la tarea (PostgreSQL SERIAL)
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: ID invalido o fuera de rango
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarea no encontrada o ajena al usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
taskRouter.get("/:id", validateIdParam("id"), taskController.getById);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar parcialmente una tarea
 *     description: Actualiza uno o mas campos de la tarea especificada. Requiere al menos un campo a modificar y que pertenezca al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 2147483647
 *         description: Identificador numerico de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskDTO'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos invalidos, cuerpo vacio o campos no permitidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarea no encontrada o ajena al usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
taskRouter.put("/:id", validateIdParam("id"), validate(updateTaskSchema), taskController.update);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     description: Elimina una tarea si pertenece al usuario autenticado. Responde 404 si la tarea pertenece a otro usuario o no existe.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 2147483647
 *         description: Identificador numerico de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada exitosamente
 *       400:
 *         description: ID invalido o fuera de rango
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarea no encontrada o ajena al usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
taskRouter.delete("/:id", validateIdParam("id"), taskController.delete);

export default taskRouter;
