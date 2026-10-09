import { JSONSchemaType } from "ajv";

export interface RegisterDTO {
  nombre: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * Esquema de validacion para el registro de nuevos usuarios.
 * - nombre: VARCHAR(100) NOT NULL en la tabla users
 * - email: VARCHAR(255) NOT NULL UNIQUE en la tabla users
 * - password: minLength 8 (politica de seguridad), maxLength 72 (limite util de bcrypt).
 *   Nota: La columna users.password_hash es VARCHAR(255) para almacenar el hash resultante,
 *   mientras que la contrasena en texto plano enviada por el cliente se valida a maximo 72
 *   caracteres porque bcrypt trunca silenciosamente a partir de los 72 bytes.
 * additionalProperties en false impide campos desconocidos.
 */
export const registerSchema: JSONSchemaType<RegisterDTO> = {
  type: "object",
  properties: {
    nombre: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 72,
    },
  },
  required: ["nombre", "email", "password"],
  additionalProperties: false,
};

/**
 * Esquema de validacion para el inicio de sesion (login).
 * - email: formato de correo valido, maximo 255
 * - password: minimo 1 caracter, maximo 72 (limite bcrypt)
 * additionalProperties en false.
 */
export const loginSchema: JSONSchemaType<LoginDTO> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
    password: {
      type: "string",
      minLength: 1,
      maxLength: 72,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
