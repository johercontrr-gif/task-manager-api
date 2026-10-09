import { getPool } from "../../src/persistence/db";
import fs from "node:fs";
import path from "node:path";

/**
 * Inicializa las tablas del esquema en la base de datos de pruebas si no existen.
 */
export async function initializeTestDb(): Promise<void> {
  const pool = getPool();
  const schemaPath = path.resolve(__dirname, "../../src/persistence/schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  await pool.query(schemaSql);
}

/**
 * Limpia las tablas con TRUNCATE reiniciando los contadores autoincrementales (SERIAL).
 * Garantiza total independencia y determinismo entre ejecuciones de pruebas.
 */
export async function cleanDb(): Promise<void> {
  const pool = getPool();
  await pool.query("TRUNCATE TABLE tasks, users RESTART IDENTITY CASCADE;");
}
