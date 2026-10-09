export interface User {
  id: number;
  nombre: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

/** Usuario seguro sin password_hash, para retornar en respuestas. */
export type UserResponse = Omit<User, "password_hash">;

/** Respuesta del endpoint de login/autenticacion */
export interface AuthResponse {
  token: string;
  user: UserResponse;
}

/** Carga util decodificada del JWT */
export interface JwtPayload {
  userId: number;
  email: string;
}
