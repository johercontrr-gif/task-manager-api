import { Pool, types, QueryResult, QueryResultRow } from "pg";
import { Config } from "../config/config";

// Registrar parser para evitar desfases de zona horaria y tipos inconsistentes en DATE.
// Por defecto pg parsea las columnas DATE como un objeto Date de JavaScript en medianoche local (00:00:00 local).
// Al serializar a ISO/UTC o al interactuar con entornos con husos horarios distintos (especialmente al este de UTC),
// esto provoca desplazamientos de dia. Ademas, el contrato de la API espera una cadena pura "YYYY-MM-DD".
// Con este parser, pg retorna directamente la cadena de texto "YYYY-MM-DD" tal como esta almacenada en PostgreSQL.
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
