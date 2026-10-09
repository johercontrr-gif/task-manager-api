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

export interface UpdateTaskData {
  titulo?: string;
  descripcion?: string | null;
  fecha_vencimiento?: string | null;
  estado?: TaskEstado;
}

/**
 * Repositorio de tareas para PostgreSQL.
 * Ejecuta consultas SQL parametrizadas y asegura el aislamiento estricto
 * por usuario mediante la clausula 'WHERE id = $1 AND user_id = $2'.
 */
export class TaskRepository {
  /**
   * Inserta una nueva tarea asociada a un usuario autenticado.
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

  /**
   * Busca una tarea por su ID verificando estrictamente la pertenencia al usuario (user_id).
   * Si la tarea no existe o pertenece a otro usuario, retorna null.
   */
  async findByIdAndUserId(id: number, userId: number): Promise<Task | null> {
    const pool = getPool();
    const query = `
      SELECT id, titulo, descripcion, fecha_vencimiento, estado, user_id, created_at, updated_at
      FROM tasks
      WHERE id = $1 AND user_id = $2;
    `;
    const result: QueryResult<Task> = await pool.query(query, [id, userId]);
    return result.rows[0] || null;
  }

  /**
   * Actualiza parcialmente los campos de una tarea perteneciente al usuario.
   * Construye una consulta SQL parametrizada dinamica con lista blanca de columnas
   * y actualiza updated_at a NOW().
   */
  async update(id: number, userId: number, data: UpdateTaskData): Promise<Task | null> {
    const pool = getPool();
    const updates: string[] = [];
    const values: (string | number | null)[] = [];
    let paramIndex = 1;

    if (data.titulo !== undefined) {
      updates.push(`titulo = $${paramIndex++}`);
      values.push(data.titulo);
    }
    if (data.descripcion !== undefined) {
      updates.push(`descripcion = $${paramIndex++}`);
      values.push(data.descripcion);
    }
    if (data.fecha_vencimiento !== undefined) {
      updates.push(`fecha_vencimiento = $${paramIndex++}`);
      values.push(data.fecha_vencimiento);
    }
    if (data.estado !== undefined) {
      updates.push(`estado = $${paramIndex++}`);
      values.push(data.estado);
    }

    if (updates.length === 0) {
      return this.findByIdAndUserId(id, userId);
    }

    updates.push(`updated_at = NOW()`);

    const query = `
      UPDATE tasks
      SET ${updates.join(", ")}
      WHERE id = $${paramIndex++} AND user_id = $${paramIndex}
      RETURNING id, titulo, descripcion, fecha_vencimiento, estado, user_id, created_at, updated_at;
    `;
    values.push(id, userId);

    const result: QueryResult<Task> = await pool.query(query, values);
    return result.rows[0] || null;
  }

  /**
   * Elimina una tarea asegurando que pertenezca al usuario autenticado.
   * Retorna true si se elimino una fila, o false si no existia o era de otro usuario.
   */
  async delete(id: number, userId: number): Promise<boolean> {
    const pool = getPool();
    const query = `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
      RETURNING id;
    `;
    const result = await pool.query(query, [id, userId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export const taskRepository = new TaskRepository();
