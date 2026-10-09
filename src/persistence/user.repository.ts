import { QueryResult } from "pg";
import { getPool } from "./db";
import { User, UserResponse } from "../types/user.types";
import { ConflictError } from "../errors/app.error";

/**
 * Repositorio de usuarios para PostgreSQL.
 * Ejecuta consultas SQL parametrizadas y traduce codigos tecnicos de PostgreSQL
 * (como 23505 unique_violation) a errores de dominio de la aplicacion.
 */
export class UserRepository {
  /**
   * Inserta un nuevo usuario en la base de datos.
   * Utiliza la clausula RETURNING para obtener el usuario creado sin exponer password_hash.
   * Si el email ya existe, la base de datos lanza el error 23505 y se traduce a ConflictError.
   */
  async create(nombre: string, email: string, passwordHash: string): Promise<UserResponse> {
    const pool = getPool();
    const query = `
      INSERT INTO users (nombre, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, nombre, email, created_at;
    `;
    const values = [nombre, email, passwordHash];

    try {
      const result: QueryResult<UserResponse> = await pool.query(query, values);
      return result.rows[0];
    } catch (error: unknown) {
      // 23505: unique_violation en PostgreSQL (email ya registrado)
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code: string }).code === "23505"
      ) {
        throw new ConflictError("El correo electronico ya esta registrado");
      }
      throw error;
    }
  }

  /**
   * Busca un usuario por email incluyendo password_hash para procesos de autenticacion.
   */
  async findByEmail(email: string): Promise<User | null> {
    const pool = getPool();
    const query = `
      SELECT id, nombre, email, password_hash, created_at
      FROM users
      WHERE email = $1;
    `;
    const result: QueryResult<User> = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Busca un usuario por ID sin exponer password_hash.
   */
  async findById(id: number): Promise<UserResponse | null> {
    const pool = getPool();
    const query = `
      SELECT id, nombre, email, created_at
      FROM users
      WHERE id = $1;
    `;
    const result: QueryResult<UserResponse> = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

export const userRepository = new UserRepository();
