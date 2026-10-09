import swaggerJSDoc from "swagger-jsdoc";
import path from "node:path";

/**
 * Patrones de busqueda de archivos con anotaciones OpenAPI JSDoc.
 * Se normalizan las barras invertidas a '/' para garantizar compatibilidad
 * con el motor glob en Windows y funcionar de forma identica en desarrollo (src)
 * y en produccion transpilada (dist).
 */
const routesPattern = path
  .join(__dirname, "../api/routes/*.{ts,js}")
  .replace(/\\/g, "/");

const appPattern = path
  .join(__dirname, "../app.{ts,js}")
  .replace(/\\/g, "/");

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestion de Tareas",
      version: "1.0.0",
      description:
        "API REST modular para gestion de usuarios y tareas con autenticacion JWT, validacion AJV y PostgreSQL.",
    },
    servers: [
      {
        url: "/",
        description: "Servidor actual",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token de autenticacion JWT. Formato: Bearer <token>",
        },
      },
      schemas: {
        RegisterDTO: {
          type: "object",
          required: ["nombre", "email", "password"],
          properties: {
            nombre: {
              type: "string",
              maxLength: 100,
              example: "Juan Perez",
            },
            email: {
              type: "string",
              format: "email",
              maxLength: 255,
              example: "juan@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              maxLength: 100,
              example: "password123",
            },
          },
        },
        LoginDTO: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "juan@example.com",
            },
            password: {
              type: "string",
              example: "password123",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nombre: { type: "string", example: "Juan Perez" },
            email: { type: "string", example: "juan@example.com" },
            created_at: { type: "string", format: "date-time", example: "2026-10-09T10:00:00.000Z" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            data: {
              type: "object",
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        CreateTaskDTO: {
          type: "object",
          required: ["titulo"],
          properties: {
            titulo: {
              type: "string",
              minLength: 1,
              maxLength: 200,
              example: "Comprar suministros",
            },
            descripcion: {
              type: "string",
              nullable: true,
              example: "Comprar utiles de oficina para el equipo",
            },
            fecha_vencimiento: {
              type: "string",
              format: "date",
              nullable: true,
              example: "2026-10-25",
            },
            estado: {
              type: "string",
              enum: ["pendiente", "en curso", "completada"],
              default: "pendiente",
              example: "pendiente",
            },
          },
        },
        UpdateTaskDTO: {
          type: "object",
          minProperties: 1,
          properties: {
            titulo: {
              type: "string",
              minLength: 1,
              maxLength: 200,
              example: "Comprar suministros urgentes",
            },
            descripcion: {
              type: "string",
              nullable: true,
              example: "Se agregan marcadores y hojas",
            },
            fecha_vencimiento: {
              type: "string",
              format: "date",
              nullable: true,
              example: "2026-10-30",
            },
            estado: {
              type: "string",
              enum: ["pendiente", "en curso", "completada"],
              example: "en curso",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            titulo: { type: "string", example: "Comprar suministros" },
            descripcion: { type: "string", nullable: true, example: "Comprar utiles de oficina" },
            fecha_vencimiento: { type: "string", format: "date", nullable: true, example: "2026-10-25" },
            estado: { type: "string", enum: ["pendiente", "en curso", "completada"], example: "pendiente" },
            user_id: { type: "integer", example: 1 },
            created_at: { type: "string", format: "date-time", example: "2026-10-09T10:00:00.000Z" },
            updated_at: { type: "string", format: "date-time", example: "2026-10-09T10:00:00.000Z" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", example: "Mensaje explicativo del error" },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string", example: "email" },
                  message: { type: "string", example: "El formato debe ser email" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [routesPattern, appPattern],
};

export const swaggerSpec = swaggerJSDoc(options);
