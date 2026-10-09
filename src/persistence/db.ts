import { Pool, types, QueryResult, QueryResultRow } from "pg";
import { Config } from "../config/config";

// Registrar parser para evitar desfase de zona horaria en columnas tipo DATE.
// Por defecto pg convierte DATE a objeto Date en UTC medianoche, lo que puede
// restar un dia segun la zona horaria local. Con esto, devuelve siempre "YYYY-MM-DD".
types.setTypeParser(types.builtins.DATE, (value: string) => value);

let poolInstance: Pool | undefined;

/**
 * Devuelve la instancia unica del Pool de conexiones de PostgreSQL.
 * Se inicializa perezosamente usando la configuracion validada.
 */
export function getPool(): Pool {
  if (!poolInstance) {
    const config = Config.getInstance();
    poolInstance = new Pool({
      host: config.dbHost,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
    });
  }
  return poolInstance;
}

/**
 * Ejecuta una consulta SQL parametrizada contra el pool de conexiones.
 *
 * @param text - Sentencia SQL con marcadores $1, $2, etc.
 * @param params - Valores correspondientes a los parametros.
 */
export async function query<R extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<R>> {
  const pool = getPool();
  return pool.query<R>(text, params);
}

/**
 * Cierra todas las conexiones del pool. Util principalmente al terminar pruebas.
 */
export async function closePool(): Promise<void> {
  if (poolInstance) {
    await poolInstance.end();
    poolInstance = undefined;
  }
}
