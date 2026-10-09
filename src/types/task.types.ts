/**
 * Lista inmutable de los estados permitidos para una tarea.
 * Fuente unica de verdad: se usa para derivar tipos en TypeScript,
 * validacion en AJV, documentacion en Swagger y el CHECK de SQL.
 */
export const TASK_ESTADOS = ["pendiente", "en curso", "completada"] as const;

export type TaskEstado = (typeof TASK_ESTADOS)[number];

export interface Task {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha_vencimiento: string | null;
  estado: TaskEstado;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
