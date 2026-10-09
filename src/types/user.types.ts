export interface User {
  id: number;
  nombre: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

/** Usuario seguro sin password_hash, para retornar en respuestas. */
export type UserResponse = Omit<User, "password_hash">;
