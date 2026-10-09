import { taskRepository, TaskRepository } from "../persistence/task.repository";
import { CreateTaskDTO } from "../schemas/task.schema";
import { Task } from "../types/task.types";

/**
 * Servicio de logica de negocio para la gestion de tareas.
 * Aplica reglas de negocio, valores por defecto y delegacion de persistencia.
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
}

export const taskService = new TaskService();
