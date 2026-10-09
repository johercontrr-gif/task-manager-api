import { Request, Response } from "express";
import { taskService, TaskService } from "../services/task.service";
import { CreateTaskDTO } from "../schemas/task.schema";

/**
 * Controlador para los endpoints de gestion de tareas.
 * Extrae los parametros de la peticion HTTP y el userId autenticado,
 * delegando la logica al servicio y formateando las respuestas JSON.
 */
export class TaskController {
  constructor(private readonly taskServ: TaskService = taskService) {}

  /**
   * POST /tasks
   * Crea una nueva tarea para el usuario actual.
   * Responde 201 Created con el objeto de la tarea creada.
   */
  create = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId!;
    const data: CreateTaskDTO = req.body;
    const task = await this.taskServ.createTask(userId, data);

    res.status(201).json({
      status: "success",
      data: task,
    });
  };

  /**
   * GET /tasks
   * Obtiene la lista de tareas del usuario actual.
   * Responde 200 OK con el listado de tareas.
   */
  getAll = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId!;
    const tasks = await this.taskServ.getUserTasks(userId);

    res.status(200).json({
      status: "success",
      data: tasks,
    });
  };
}

export const taskController = new TaskController();
