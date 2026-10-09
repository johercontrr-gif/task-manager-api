import dotenv from "dotenv";

/**
 * Configuracion de la aplicacion (patron Singleton).
 *
 * Lee las variables de entorno una sola vez y las deja disponibles con
 * `Config.getInstance()`. Si falta alguna variable obligatoria o tiene un
 * valor invalido, lanza un error al arrancar (fail-fast) en lugar de fallar
 * mas tarde con un error confuso.
 *
 * Con NODE_ENV=test carga `.env.test` (base de datos de pruebas separada);
 * en cualquier otro caso carga `.env`.
 */
export class Config {
  private static instance: Config | undefined;

  readonly port: number;
  readonly databaseUrl?: string;
  readonly dbHost: string;
  readonly dbPort: number;
  readonly dbUser: string;
  readonly dbPassword: string;
  readonly dbName: string;
  readonly dbSsl: boolean;
  readonly jwtSecret: string;
  readonly jwtExpiresIn: string;
  readonly bcryptSaltRounds: number;
  readonly rateLimitWindowMs: number;
  readonly rateLimitMaxRequests: number;

  /** El constructor es privado: la unica forma de obtener la config es getInstance(). */
  private constructor() {
    const isTest = process.env.NODE_ENV === "test";
    dotenv.config({ path: isTest ? ".env.test" : ".env", quiet: true });

    this.port = Config.readNumber("PORT", 3000);

    const rawDbUrl = process.env.DATABASE_URL;
    if (rawDbUrl) {
      this.databaseUrl = rawDbUrl;
      const parsed = new URL(rawDbUrl);
      this.dbHost = parsed.hostname;
      this.dbPort = Number(parsed.port) || 5432;
      this.dbUser = decodeURIComponent(parsed.username);
      this.dbPassword = decodeURIComponent(parsed.password);
      this.dbName = parsed.pathname.replace(/^\//, "");
    } else {
      this.dbHost = Config.readString("DB_HOST");
      this.dbPort = Config.readNumber("DB_PORT");
      this.dbUser = Config.readString("DB_USER");
      this.dbPassword = Config.readString("DB_PASSWORD");
      this.dbName = Config.readString("DB_NAME");
    }

    this.dbSsl = process.env.DB_SSL === "true";

    this.jwtSecret = Config.readString("JWT_SECRET");
    if (this.jwtSecret.length < 32) {
      throw new Error("JWT_SECRET debe tener al menos 32 caracteres");
    }
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

    // 12 por defecto; en pruebas se permite un valor bajo para que sean rapidas.
    const minRounds = isTest ? 4 : 10;
    this.bcryptSaltRounds = Config.readNumber("BCRYPT_SALT_ROUNDS", 12);
    if (this.bcryptSaltRounds < minRounds) {
      throw new Error(`BCRYPT_SALT_ROUNDS debe ser al menos ${minRounds}`);
    }

    // Rate limiting para rutas sensibles de autenticacion
    this.rateLimitWindowMs = Config.readNumber("RATE_LIMIT_WINDOW_MS", 15 * 60 * 1000);
    this.rateLimitMaxRequests = Config.readNumber("RATE_LIMIT_MAX_REQUESTS", isTest ? 1000 : 10);
  }

  /** Devuelve la unica instancia, creandola (y validando el entorno) la primera vez. */
  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  /** Lee una variable de texto obligatoria. */
  private static readString(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Falta la variable de entorno obligatoria: ${name}`);
    }
    return value;
  }

  /** Lee una variable numerica. Si no tiene valor por defecto, es obligatoria. */
  private static readNumber(name: string, defaultValue?: number): number {
    const raw = process.env[name];
    if (!raw) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      throw new Error(`Falta la variable de entorno obligatoria: ${name}`);
    }
    const value = Number(raw);
    if (!Number.isInteger(value)) {
      throw new Error(`La variable de entorno ${name} debe ser un numero entero`);
    }
    return value;
  }
}
