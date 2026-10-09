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

// POST /tasks - Crear una nueva tarea
taskRouter.post("/", validate(createTaskSchema), taskController.create);

// GET /tasks - Listar todas las tareas del usuario autenticado
taskRouter.get("/", taskController.getAll);

// GET /tasks/:id - Obtener el detalle de una tarea por ID
taskRouter.get("/:id", validateIdParam("id"), taskController.getById);

// PUT /tasks/:id - Actualizar parcialmente una tarea por ID
taskRouter.put("/:id", validateIdParam("id"), validate(updateTaskSchema), taskController.update);

// DELETE /tasks/:id - Eliminar una tarea por ID
taskRouter.delete("/:id", validateIdParam("id"), taskController.delete);

export default taskRouter;
