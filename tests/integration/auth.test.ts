import express from "express";
import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { closePool } from "../../src/persistence/db";
import { initializeTestDb, cleanDb } from "../helpers/db.helper";
import { createAuthRateLimiter } from "../../src/api/middlewares/rate-limit.middleware";

describe("Endpoints de Autenticacion (/auth)", () => {
  beforeAll(async () => {
    await initializeTestDb();
  });

  beforeEach(async () => {
    await cleanDb();
  });

  afterAll(async () => {
    await closePool();
  });

  describe("POST /auth/register", () => {
    it("debe registrar un usuario exitosamente con codigo 201 y omitir password_hash", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({
          nombre: "Carlos Gomez",
          email: "carlos@example.com",
          password: "passwordSegura123",
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.nombre).toBe("Carlos Gomez");
      expect(res.body.data.email).toBe("carlos@example.com");
      expect(res.body.data).not.toHaveProperty("password_hash");
      expect(res.body.data).not.toHaveProperty("password");
    });

    it("debe retornar 400 si falta el email o la contrasena no cumple limites (8 a 72)", async () => {
      const resSinEmail = await request(app)
        .post("/auth/register")
        .send({
          nombre: "Sin Email",
          password: "password123",
        });
      expect(resSinEmail.status).toBe(400);
      expect(resSinEmail.body.status).toBe("error");

      // Menor a 8 caracteres (ej. 7 caracteres)
      const resPassCorta = await request(app)
        .post("/auth/register")
        .send({
          nombre: "Pass Corta",
          email: "pass@example.com",
          password: "1234567",
        });
      expect(resPassCorta.status).toBe(400);
      expect(resPassCorta.body.status).toBe("error");

      // Mayor a 72 caracteres (limite util de bcrypt)
      const resPassLarga = await request(app)
        .post("/auth/register")
        .send({
          nombre: "Pass Larga",
          email: "passlarga@example.com",
          password: "a".repeat(73),
        });
      expect(resPassLarga.status).toBe(400);
      expect(resPassLarga.body.status).toBe("error");
    });

    it("debe retornar 409 Conflict si el email ya esta registrado", async () => {
      // Primer registro
      await request(app)
        .post("/auth/register")
        .send({
          nombre: "Usuario Original",
          email: "duplicado@example.com",
          password: "password123",
        });

      // Segundo registro con mismo email
      const resDuplicado = await request(app)
        .post("/auth/register")
        .send({
          nombre: "Usuario Clon",
          email: "duplicado@example.com",
          password: "otraPassword456",
        });

      expect(resDuplicado.status).toBe(409);
      expect(resDuplicado.body.status).toBe("error");
      expect(resDuplicado.body.message).toMatch(/ya esta registrado/i);
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      // Registrar un usuario base para pruebas de login
      await request(app)
        .post("/auth/register")
        .send({
          nombre: "Ana Lopez",
          email: "ana@example.com",
          password: "passwordValida123",
        });
    });

    it("debe iniciar sesion exitosamente con codigo 200 y retornar token JWT", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "ana@example.com",
          password: "passwordValida123",
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("token");
      expect(typeof res.body.data.token).toBe("string");
      expect(res.body.data.user.email).toBe("ana@example.com");
      expect(res.body.data.user).not.toHaveProperty("password_hash");
    });

    it("debe retornar 401 con contrasena incorrecta", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "ana@example.com",
          password: "passwordErronea",
        });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("error");
      expect(res.body.message).toMatch(/credenciales invalidas/i);
    });

    it("debe retornar 401 con email que no existe en el sistema", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "inexistente@example.com",
          password: "passwordCualquiera",
        });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("error");
      expect(res.body.message).toMatch(/credenciales invalidas/i);
    });

    it("debe incluir cabeceras de rate limiting en respuestas de autenticacion", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: "ana@example.com",
          password: "passwordValida123",
        });

      expect(res.status).toBe(200);
      expect(res.headers).toHaveProperty("ratelimit-limit");
      expect(res.headers).toHaveProperty("ratelimit-remaining");
    });

    it("debe bloquear con codigo 429 Too Many Requests y formato JSON consistente al sobrepasar el umbral", async () => {
      const testLimiterApp = express();
      testLimiterApp.use(express.json());
      testLimiterApp.post(
        "/test-rate-limit",
        createAuthRateLimiter({ windowMs: 60000, max: 2 }),
        (_req, res) => {
          res.status(200).json({ status: "success", data: "ok" });
        }
      );

      // Peticion 1: Permitida
      const res1 = await request(testLimiterApp).post("/test-rate-limit");
      expect(res1.status).toBe(200);

      // Peticion 2: Permitida (limite alcanzado)
      const res2 = await request(testLimiterApp).post("/test-rate-limit");
      expect(res2.status).toBe(200);

      // Peticion 3: Bloqueada con 429 Too Many Requests
      const res3 = await request(testLimiterApp).post("/test-rate-limit");
      expect(res3.status).toBe(429);
      expect(res3.body).toEqual({
        status: "error",
        message: "Demasiadas solicitudes desde esta direccion IP, por favor intente nuevamente mas tarde",
      });
      expect(res3.headers["ratelimit-remaining"]).toBe("0");
    });
  });
});
