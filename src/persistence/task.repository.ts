import { QueryResult } from "pg";
import { getPool } from "./db";
import { Task, TaskEstado } from "../types/task.types";

export interface CreateTaskData {
  titulo: string;
  descripcion: string | null;
  fecha_vencimiento: string | null;
  estado: TaskEstado;
  user_id: number;
}

/**
 * Repositorio de tareas para PostgreSQL.
 * Ejecuta consultas SQL parametrizadas y asegura el aislamiento por usuario (user_id).
 */
export class TaskRepository {
  /**
   * Inserta una nueva tarea asociada a un usuario autenticado.
   * Utiliza RETURNING para obtener la fila completa generada por la base de datos.
   */
  async create(data: CreateTaskData): Promise<Task> {
    const pool = getPool();
    const query = `
      INSERT INTO tasks (titulo, descripcion, fecha_vencimiento, estado, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, titulo, descripcion, fecha_vencimiento, estado, user_id, created_at, updated_at;
    `;
    const values = [
      data.titulo,
      data.descripcion,
      data.fecha_vencimiento,
      data.estado,
      data.user_id,
    ];

    const result: QueryResult<Task> = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Obtiene todas las tareas que pertenecen al usuario especificado.
   * Ordena por fecha de creacion descendente (las mas recientes primero).
   */
  async findByUserId(userId: number): Promise<Task[]> {
    const pool = getPool();
    const query = `
      SELECT id, titulo, descripcion, fecha_vencimiento, estado, user_id, created_at, updated_at
      FROM tasks
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result: QueryResult<Task> = await pool.query(query, [userId]);
    return result.rows;
  }
}

export const taskRepository = new TaskRepository();
