import { Request, Response } from "express";
import { taskService, TaskService } from "../services/task.service";
import { CreateTaskDTO, UpdateTaskDTO } from "../schemas/task.schema";

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

  /**
   * GET /tasks/:id
   * Obtiene una tarea especifica por su identificador.
   * Responde 200 OK con la tarea solicitada.
   */
  getById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId!;
    const taskId = Number(req.params.id);
    const task = await this.taskServ.getTaskById(userId, taskId);

    res.status(200).json({
      status: "success",
      data: task,
    });
  };

  /**
   * PUT /tasks/:id
   * Actualiza parcialmente una tarea perteneciente al usuario autenticado.
   * Responde 200 OK con los datos actualizados de la tarea.
   */
  update = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId!;
    const taskId = Number(req.params.id);
    const data: UpdateTaskDTO = req.body;
    const updatedTask = await this.taskServ.updateTask(userId, taskId, data);

    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  };

  /**
   * DELETE /tasks/:id
   * Elimina una tarea perteneciente al usuario autenticado.
   * Responde 200 OK confirmando la eliminacion.
   */
  delete = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId!;
    const taskId = Number(req.params.id);
    await this.taskServ.deleteTask(userId, taskId);

    res.status(200).json({
      status: "success",
      message: "Tarea eliminada exitosamente",
    });
  };
}

export const taskController = new TaskController();
