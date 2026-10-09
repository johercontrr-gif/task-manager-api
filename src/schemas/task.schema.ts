import { JSONSchemaType } from "ajv";
import { TASK_ESTADOS, TaskEstado } from "../types/task.types";

export interface CreateTaskDTO {
  titulo: string;
  descripcion?: string;
  fecha_vencimiento?: string;
  estado?: TaskEstado;
}

export interface UpdateTaskDTO {
  titulo?: string;
  descripcion?: string | null;
  fecha_vencimiento?: string | null;
  estado?: TaskEstado;
}

/**
 * Esquema de validacion para la creacion de tareas (POST /tasks).
 * - titulo: obligatorio, de 1 a 200 caracteres (VARCHAR(200) NOT NULL).
 * - descripcion: opcional, texto descriptivo.
 * - fecha_vencimiento: opcional, formato YYYY-MM-DD (DATE).
 * - estado: opcional, debe coincidir con TASK_ESTADOS ('pendiente', 'en curso', 'completada').
 * additionalProperties en false impide campos desconocidos.
 */
export const createTaskSchema: JSONSchemaType<CreateTaskDTO> = {
  type: "object",
  properties: {
    titulo: {
      type: "string",
      minLength: 1,
      maxLength: 200,
    },
    descripcion: {
      type: "string",
      nullable: true,
    },
    fecha_vencimiento: {
      type: "string",
      format: "date",
      nullable: true,
    },
    estado: {
      type: "string",
      enum: TASK_ESTADOS,
      nullable: true,
    },
  },
  required: ["titulo"],
  additionalProperties: false,
};

/**
 * Esquema de validacion para la actualizacion parcial de tareas (PUT /tasks/:id).
 * - Exige al menos una propiedad para modificar (minProperties: 1).
 * - Aplica las mismas restricciones de longitud y formatos que la creacion.
 * - additionalProperties en false protege contra campos no autorizados.
 */
export const updateTaskSchema: JSONSchemaType<UpdateTaskDTO> = {
  type: "object",
  properties: {
    titulo: {
      type: "string",
      minLength: 1,
      maxLength: 200,
      nullable: true,
    },
    descripcion: {
      type: "string",
      nullable: true,
    },
    fecha_vencimiento: {
      type: "string",
      format: "date",
      nullable: true,
    },
    estado: {
      type: "string",
      enum: TASK_ESTADOS,
      nullable: true,
    },
  },
  minProperties: 1,
  additionalProperties: false,
};
