import fs from "node:fs";
import path from "node:path";
import { getPool, closePool } from "./db";

/**
 * Script de inicialización y migración idempotente de la base de datos.
 * Lee `schema.sql` y aplica las sentencias DDL (CREATE TABLE IF NOT EXISTS, índices)
 * tanto en entornos locales como en bases de datos gestionadas en la nube (Render, Neon, etc.).
 */
export async function initDb(): Promise<void> {
  const possiblePaths = [
    path.resolve(process.cwd(), "src/persistence/schema.sql"),
    path.resolve(__dirname, "../../src/persistence/schema.sql"),
    path.resolve(__dirname, "schema.sql"),
  ];

  const schemaPath = possiblePaths.find((p) => fs.existsSync(p));

  if (!schemaPath) {
    throw new Error("No se pudo localizar el archivo schema.sql para inicializar la base de datos.");
  }

  console.log(`[db:init] Aplicando esquema DDL desde: ${schemaPath}`);
  const sql = fs.readFileSync(schemaPath, "utf-8");

  const pool = getPool();
  await pool.query(sql);
  console.log("[db:init] Tablas e índices creados / verificados satisfactoriamente.");
  await closePool();
}

// Ejecutar automáticamente cuando se invoca directamente desde CLI
if (require.main === module) {
  initDb()
    .then(() => {
      console.log("[db:init] Proceso de inicialización finalizado con éxito.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[db:init] Error fatal durante la inicialización de la base de datos:", err);
      process.exit(1);
    });
}
