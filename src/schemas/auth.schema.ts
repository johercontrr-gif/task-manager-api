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
 * Respeta los limites y tipos de la tabla users:
 * - nombre: VARCHAR(100) NOT NULL
 * - email: VARCHAR(255) NOT NULL UNIQUE
 * - password: minLength 6 caracteres, maxLength 100
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
      minLength: 6,
      maxLength: 100,
    },
  },
  required: ["nombre", "email", "password"],
  additionalProperties: false,
};

/**
 * Esquema de validacion para el inicio de sesion (login).
 * - email: formato de correo valido, maximo 255
 * - password: minimo 1 caracter, maximo 100
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
      maxLength: 100,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
