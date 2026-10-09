import bcrypt from "bcrypt";
import { Config } from "../config/config";
import { userRepository, UserRepository } from "../persistence/user.repository";
import { RegisterDTO } from "../schemas/auth.schema";
import { UserResponse } from "../types/user.types";

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
}

export const authService = new AuthService();
