import { taskRepository, TaskRepository, UpdateTaskData } from "../persistence/task.repository";
import { CreateTaskDTO, UpdateTaskDTO } from "../schemas/task.schema";
import { Task } from "../types/task.types";
import { NotFoundError, ValidationError } from "../errors/app.error";

/**
 * Servicio de logica de negocio para la gestion de tareas.
 * Aplica reglas de negocio, validaciones de existencia, valores por defecto
 * y control de pertenencia (autorizacion por recurso).
 */
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository = taskRepository) {}

  /**
   * Crea una nueva tarea para el usuario autenticado.
   * - Limpia espacios en blanco del titulo y descripcion.
   * - Asigna 'pendiente' como estado predeterminado si no se especifica.
   * - Asocia la tarea obligatoriamente al userId extraido del token.
   */
  async createTask(userId: number, data: CreateTaskDTO): Promise<Task> {
    const cleanTitulo = data.titulo.trim();
    if (!cleanTitulo) {
      throw new ValidationError("El titulo no puede estar vacio");
    }
    const cleanDescripcion = data.descripcion?.trim() ? data.descripcion.trim() : null;
    const fechaVencimiento = data.fecha_vencimiento || null;
    const estado = data.estado || "pendiente";

    return await this.taskRepo.create({
      titulo: cleanTitulo,
      descripcion: cleanDescripcion,
      fecha_vencimiento: fechaVencimiento,
      estado,
      user_id: userId,
    });
  }

  /**
   * Obtiene la lista de todas las tareas pertenecientes al usuario autenticado.
   */
  async getUserTasks(userId: number): Promise<Task[]> {
    return await this.taskRepo.findByUserId(userId);
  }

  /**
   * Obtiene una tarea especifica por ID verificando que pertenezca al usuario.
   * Lanza NotFoundError (404) si la tarea no existe o si pertenece a otro usuario,
   * evitando la divulgacion de existencia de recursos ajenos (mitigacion IDOR).
   */
  async getTaskById(userId: number, taskId: number): Promise<Task> {
    const task = await this.taskRepo.findByIdAndUserId(taskId, userId);
    if (!task) {
      throw new NotFoundError("Tarea no encontrada");
    }
    return task;
  }

  /**
   * Actualiza parcialmente los campos de una tarea perteneciente al usuario.
   * Aplica saneamiento de datos y lanza NotFoundError (404) si no existe o no es suya.
   */
  async updateTask(userId: number, taskId: number, data: UpdateTaskDTO): Promise<Task> {
    const updateData: UpdateTaskData = {};

    if (data.titulo !== undefined) {
      if (data.titulo === null || data.titulo.trim() === "") {
        throw new ValidationError("El titulo no puede ser nulo ni estar vacio");
      }
      updateData.titulo = data.titulo.trim();
    }
    if (data.descripcion !== undefined) {
      updateData.descripcion = data.descripcion?.trim() ? data.descripcion.trim() : null;
    }
    if (data.fecha_vencimiento !== undefined) {
      updateData.fecha_vencimiento = data.fecha_vencimiento || null;
    }
    if (data.estado !== undefined) {
      if (data.estado === null) {
        throw new ValidationError("El estado no puede ser nulo");
      }
      updateData.estado = data.estado;
    }

    const updatedTask = await this.taskRepo.update(taskId, userId, updateData);
    if (!updatedTask) {
      throw new NotFoundError("Tarea no encontrada");
    }
    return updatedTask;
  }

  /**
   * Elimina una tarea perteneciente al usuario autenticado.
   * Lanza NotFoundError (404) si la tarea no existe o pertenece a otro usuario.
   */
  async deleteTask(userId: number, taskId: number): Promise<void> {
    const deleted = await this.taskRepo.delete(taskId, userId);
    if (!deleted) {
      throw new NotFoundError("Tarea no encontrada");
    }
  }
}

export const taskService = new TaskService();
