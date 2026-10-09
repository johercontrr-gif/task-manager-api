import { describe, it, expect, beforeAll, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { closePool } from "../../src/persistence/db";
import { initializeTestDb, cleanDb } from "../helpers/db.helper";

describe("Endpoints de Gestion de Tareas (/tasks) y Control de Propiedad (Ownership)", () => {
  let tokenUser1: string;
  let tokenUser2: string;
  let userId1: number;
  let userId2: number;

  beforeAll(async () => {
    await initializeTestDb();
  });

  beforeEach(async () => {
    await cleanDb();

    // 1. Crear Usuario 1
    const reg1 = await request(app)
      .post("/auth/register")
      .send({
        nombre: "Usuario Uno",
        email: "user1@example.com",
        password: "password123",
      });
    userId1 = reg1.body.data.id;

    const login1 = await request(app)
      .post("/auth/login")
      .send({
        email: "user1@example.com",
        password: "password123",
      });
    tokenUser1 = login1.body.data.token;

    // 2. Crear Usuario 2
    const reg2 = await request(app)
      .post("/auth/register")
      .send({
        nombre: "Usuario Dos",
        email: "user2@example.com",
        password: "password456",
      });
    userId2 = reg2.body.data.id;

    const login2 = await request(app)
      .post("/auth/login")
      .send({
        email: "user2@example.com",
        password: "password456",
      });
    tokenUser2 = login2.body.data.token;
  });

  afterAll(async () => {
    await closePool();
  });

  describe("Seguridad transversal (401 sin token)", () => {
    it("debe rechazar peticiones sin token Bearer con 401", async () => {
      const resPost = await request(app).post("/tasks").send({ titulo: "Invalido" });
      expect(resPost.status).toBe(401);

      const resGet = await request(app).get("/tasks");
      expect(resGet.status).toBe(401);

      const resGetId = await request(app).get("/tasks/1");
      expect(resGetId.status).toBe(401);
    });
  });

  describe("POST /tasks", () => {
    it("debe crear una tarea exitosamente con campos completos (201 Created)", async () => {
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({
          titulo: "Presentar informe trimestral",
          descripcion: "Consolidar datos de ventas y costos",
          fecha_vencimiento: "2026-10-31",
          estado: "en curso",
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.titulo).toBe("Presentar informe trimestral");
      expect(res.body.data.descripcion).toBe("Consolidar datos de ventas y costos");
      expect(res.body.data.fecha_vencimiento).toBe("2026-10-31");
      expect(res.body.data.estado).toBe("en curso");
      expect(res.body.data.user_id).toBe(userId1);
    });

    it("debe asignar 'pendiente' como estado predeterminado si no se envia", async () => {
      const res = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({
          titulo: "Tarea simple solo con titulo",
        });

      expect(res.status).toBe(201);
      expect(res.body.data.estado).toBe("pendiente");
      expect(res.body.data.descripcion).toBeNull();
      expect(res.body.data.fecha_vencimiento).toBeNull();
    });

    it("debe retornar 400 si el titulo esta ausente o vacio", async () => {
      const resVacio = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({
          titulo: "   ",
        });

      expect(resVacio.status).toBe(400);
      expect(resVacio.body.status).toBe("error");
    });

    it("debe retornar 400 si el estado no pertenece a los permitidos", async () => {
      const resEstadoInvalido = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({
          titulo: "Tarea con estado erroneo",
          estado: "en_progreso", // No permitido; debe ser 'en curso'
        });

      expect(resEstadoInvalido.status).toBe(400);
      expect(resEstadoInvalido.body.status).toBe("error");
    });
  });

  describe("GET /tasks y Aislamiento de datos", () => {
    it("debe devolver exclusivamente las tareas pertenecientes al usuario autenticado", async () => {
      // Usuario 1 crea 2 tareas
      await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea 1 de Usuario 1" });

      await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea 2 de Usuario 1" });

      // Usuario 2 crea 1 tarea
      await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser2}`)
        .send({ titulo: "Tarea unica de Usuario 2" });

      // Consulta Usuario 1
      const resUser1 = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`);

      expect(resUser1.status).toBe(200);
      expect(resUser1.body.data).toHaveLength(2);
      expect(resUser1.body.data.every((t: any) => t.user_id === userId1)).toBe(true);

      // Consulta Usuario 2
      const resUser2 = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${tokenUser2}`);

      expect(resUser2.status).toBe(200);
      expect(resUser2.body.data).toHaveLength(1);
      expect(resUser2.body.data[0].titulo).toBe("Tarea unica de Usuario 2");
      expect(resUser2.body.data[0].user_id).toBe(userId2);
    });
  });

  describe("GET /tasks/:id (Prevencion de IDOR)", () => {
    it("debe retornar la tarea si pertenece al usuario solicitante (200 OK)", async () => {
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea propia" });
      const taskId = createRes.body.data.id;

      const getRes = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser1}`);

      expect(getRes.status).toBe(200);
      expect(getRes.body.data.id).toBe(taskId);
      expect(getRes.body.data.titulo).toBe("Tarea propia");
    });

    it("debe retornar 404 si otro usuario intenta ver la tarea (mitigacion de IDOR)", async () => {
      // Usuario 1 crea una tarea
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea privada de Usuario 1" });
      const taskId = createRes.body.data.id;

      // Usuario 2 intenta consultar la tarea de Usuario 1
      const getRes = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser2}`);

      expect(getRes.status).toBe(404);
      expect(getRes.body.status).toBe("error");
      expect(getRes.body.message).toMatch(/no encontrada/i);
    });

    it("debe retornar 400 si el ID no es un entero positivo valido", async () => {
      const resInvalido = await request(app)
        .get("/tasks/abc")
        .set("Authorization", `Bearer ${tokenUser1}`);

      expect(resInvalido.status).toBe(400);

      const resCero = await request(app)
        .get("/tasks/0")
        .set("Authorization", `Bearer ${tokenUser1}`);

      expect(resCero.status).toBe(400);
    });
  });

  describe("PUT /tasks/:id (Actualizacion parcial y Control de Propiedad)", () => {
    it("debe actualizar parcialmente los campos de una tarea propia (200 OK)", async () => {
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Titulo original", estado: "pendiente" });
      const taskId = createRes.body.data.id;

      const updateRes = await request(app)
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({
          titulo: "Titulo modificado",
          estado: "completada",
        });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.titulo).toBe("Titulo modificado");
      expect(updateRes.body.data.estado).toBe("completada");
    });

    it("debe retornar 404 si otro usuario intenta actualizar una tarea ajena (mitigacion IDOR)", async () => {
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea de Usuario 1" });
      const taskId = createRes.body.data.id;

      // Usuario 2 intenta modificarla
      const updateRes = await request(app)
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser2}`)
        .send({ titulo: "Ataque de modificacion no autorizada" });

      expect(updateRes.status).toBe(404);
      expect(updateRes.body.status).toBe("error");
      expect(updateRes.body.message).toMatch(/no encontrada/i);
    });

    it("debe retornar 400 si el cuerpo de actualizacion esta vacio (minProperties: 1)", async () => {
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea base" });
      const taskId = createRes.body.data.id;

      const updateRes = await request(app)
        .put(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({});

      expect(updateRes.status).toBe(400);
      expect(updateRes.body.status).toBe("error");
    });
  });

  describe("DELETE /tasks/:id (Eliminacion y Control de Propiedad)", () => {
    it("debe retornar 404 si otro usuario intenta eliminar una tarea ajena (mitigacion IDOR)", async () => {
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea a defender" });
      const taskId = createRes.body.data.id;

      // Usuario 2 intenta borrar la tarea de Usuario 1
      const deleteRes = await request(app)
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser2}`);

      expect(deleteRes.status).toBe(404);
      expect(deleteRes.body.status).toBe("error");
    });

    it("debe eliminar una tarea propia exitosamente (200 OK) y quedar inaccesible despues", async () => {
      const createRes = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${tokenUser1}`)
        .send({ titulo: "Tarea a eliminar" });
      const taskId = createRes.body.data.id;

      // Usuario 1 elimina su tarea
      const deleteRes = await request(app)
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser1}`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toMatch(/eliminada exitosamente/i);

      // Verificacion posterior: debe responder 404
      const getRes = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${tokenUser1}`);

      expect(getRes.status).toBe(404);
    });
  });
});
