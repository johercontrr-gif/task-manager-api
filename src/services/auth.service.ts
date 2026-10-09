import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Config } from "../config/config";
import { userRepository, UserRepository } from "../persistence/user.repository";
import { LoginDTO, RegisterDTO } from "../schemas/auth.schema";
import { AuthResponse, JwtPayload, UserResponse } from "../types/user.types";
import { AuthenticationError } from "../errors/app.error";

/**
 * Hash dummy precalculado con coste 12 para mitigar ataques de temporizacion (timing attacks).
 * Si el usuario no existe, se ejecuta una comparacion igualmente para que el tiempo de
 * respuesta sea indistinguible y no permita enumerar usuarios registrados.
 */
const DUMMY_HASH = "$2b$12$1S5n9DMK5WBWWdCc6m8yT.mrLzAJ83SffXnKecge1P5f0HBm5FndK";

/**
 * Servicio de logica de negocio para autenticacion y usuarios.
 * Encapsula reglas de negocio, hash de contrasenas y normalizacion de datos.
 */
export class AuthService {
  constructor(private readonly userRepo: UserRepository = userRepository) {}

  /**
   * Registra un nuevo usuario en el sistema.
   * - Normaliza el email a minusculas y sin espacios circundantes.
   * - Genera el hash de la contrasena con bcrypt usando el numero de salt rounds configurado.
   * - Delega la persistencia al UserRepository (la restriccion UNIQUE de BD es la fuente de verdad).
   * - Retorna los datos publicos del usuario registrado sin password_hash.
   */
  async register(data: RegisterDTO): Promise<UserResponse> {
    const config = Config.getInstance();
    const normalizedEmail = data.email.trim().toLowerCase();
    const cleanNombre = data.nombre.trim();
    const passwordHash = await bcrypt.hash(data.password, config.bcryptSaltRounds);

    return await this.userRepo.create(cleanNombre, normalizedEmail, passwordHash);
  }

  /**
   * Inicia sesion verificando credenciales y generando un token JWT firmado.
   * - Normaliza el correo antes de buscar.
   * - Si el usuario no existe, ejecuta bcrypt contra DUMMY_HASH para prevenir enumeracion.
   * - Si la contrasena es invalida, lanza AuthenticationError con mensaje generico.
   * - Firma el token JWT con algoritmo explicito HS256 y tiempo de expiracion configurado.
   */
  async login(data: LoginDTO): Promise<AuthResponse> {
    const config = Config.getInstance();
    const normalizedEmail = data.email.trim().toLowerCase();

    const user = await this.userRepo.findByEmail(normalizedEmail);

    if (!user) {
      // Proteccion contra ataques de canal lateral / timing
      await bcrypt.compare(data.password, DUMMY_HASH);
      throw new AuthenticationError("Credenciales invalidas");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isPasswordValid) {
      throw new AuthenticationError("Credenciales invalidas");
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, config.jwtSecret, {
      algorithm: "HS256",
      expiresIn: config.jwtExpiresIn as any,
    });

    const userResponse: UserResponse = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      created_at: user.created_at,
    };

    return {
      token,
      user: userResponse,
    };
  }
}

export const authService = new AuthService();
