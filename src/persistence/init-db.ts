import fs from "node:fs";
import path from "node:path";
import { getPool, closePool } from "./db";

/**
 * Script de inicialización y migración idempotente de la base de datos.
 * Lee `schema.sql` y aplica las sentencias DDL (CREATE TABLE IF NOT EXISTS, índices).
 * Incluye reintentos progresivos para esperar a que la base de datos en la nube esté lista.
 */
export async function initDb(maxRetries = 5, delayMs = 3000): Promise<void> {
  const possiblePaths = [
    path.resolve(process.cwd(), "src/persistence/schema.sql"),
    path.resolve(__dirname, "../../src/persistence/schema.sql"),
    path.resolve(__dirname, "schema.sql"),
  ];

  const schemaPath = possiblePaths.find((p) => fs.existsSync(p));

  if (!schemaPath) {
    throw new Error("No se pudo localizar el archivo schema.sql para inicializar la base de datos.");
  }

  const sql = fs.readFileSync(schemaPath, "utf-8");

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[db:init] Intentando conectar y aplicar esquema (intento ${attempt}/${maxRetries})...`);
      const pool = getPool();
      await pool.query(sql);
      console.log("[db:init] Tablas e índices creados / verificados satisfactoriamente.");
      await closePool();
      return;
    } catch (err) {
      console.warn(`[db:init] Aviso en intento ${attempt}:`, (err as Error).message);
      if (attempt === maxRetries) {
        throw err;
      }
      console.log(`[db:init] Esperando ${delayMs / 1000}s antes de reintentar...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
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
