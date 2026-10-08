# Plan del proyecto: API de Gestión de Tareas (3 días)

**Idea clave:** cada paso = 1 commit = 1 entrada corta en `DEVELOPMENT_LOG.md`.
Así documentar es copiar lo que ya hiciste.

**Reglas de simplicidad**
- Funciones cortas, nombres claros, sin patrones avanzados (sin genéricos complejos ni abstracciones extra).
- Una sola forma de hacer cada cosa (un `Pool`, un middleware `validate`, un middleware de errores).
- Comentarios JSDoc breves, escritos junto al código.
- Antes de cada commit: `npm run typecheck`.

**Ciclo de cada paso (se repite siempre)**
1. Se escribe el código (con o sin IA).
2. Se prueba (curl / Swagger / test).
3. Se corre `npm run typecheck`.
4. Se anota en la bitácora: prompt → aceptado → rechazado/modificado → verificación.
5. Commit con Conventional Commits (lo haces tú).

---

## Día 1: Base, configuración y base de datos

| # | Paso | Qué se hace | Commit |
|---|------|-------------|--------|
| 1 | Inicializar | `npm init`, instalar express, typescript, tsx, @types; `tsconfig` strict + ES2022; scripts `dev/build/start/typecheck`. Verificar versión de Express (5.x o 4.x). | `chore: initialize project with typescript and express` |
| 2 | Carpetas | Crear `src/api, controllers, services, persistence, config, errors, schemas, types, utils`, `app.ts`, `server.ts`. `.gitignore`. | `chore: add folder structure` |
| 3 | Config | Clase `Config` Singleton: lee `.env`, valida variables, falla si falta alguna. `.env.example` y `.env.test`. | `feat: add singleton config loader with env validation` |
| 4 | Base de datos | `schema.sql` (users, tasks, índice), `db.ts` con `Pool`, type parser de DATE, `docker-compose.yml`. | `feat: add database connection pool and schema` |

**Se anota en la bitácora hoy:** este plan como uso de IA, el error del estado `en_progreso` y su corrección.

---

## Día 2: Errores, validación y autenticación

| # | Paso | Qué se hace | Commit |
|---|------|-------------|--------|
| 5 | Errores | `AppError` + 5 derivadas (400, 401, 403, 404, 409). Middleware global (`{status, message, details?}`), handler 404 y JSON malformado. | `feat: add custom error classes and global error handler` |
| 6 | Validación | Middleware `validate(schema)` con AJV + ajv-formats. Schemas `register`, `login` (`additionalProperties: false`, límites iguales a la BD). | `feat: add ajv validation middleware` |
| 7 | Registro | `POST /auth/register`: repositorio (traduce 23505 → `ConflictError`), service (bcrypt), controller, route. | `feat: add user registration endpoint` |
| 8 | Login | `POST /auth/login`: `bcrypt.compare`, mensaje genérico, JWT HS256. | `feat: add user login endpoint with jwt` |
| 9 | Middleware auth | Lee `Bearer`, `jwt.verify` con HS256, type guard del payload, `req.userId`. | `feat: add jwt authentication middleware` |

**Se anota en la bitácora hoy:** traducir 23505 en el repositorio, HS256 explícito, límites AJV = columnas, hash dummy en login.

---

## Día 3: Tareas, Swagger, pruebas, README y entrega

| # | Paso | Qué se hace | Commit |
|---|------|-------------|--------|
| 10 | Crear y listar | `POST /tasks`, `GET /tasks`. Constante `ESTADOS as const` (una sola vez). `user_id` sale del token. | `feat: add task creation and listing endpoints` |
| 11 | Ver, editar y borrar | `GET/PUT/DELETE /tasks/:id` con `WHERE id=$1 AND user_id=$2`, 404 si no es suyo, validar `:id` (1 a 2147483647), PUT parcial con lista blanca de columnas. | `feat: add task get, update and delete endpoints` |
| 12 | Swagger | `swagger-jsdoc` + `swagger-ui-express` en `/api-docs`, bearerAuth, ruta que funcione en `src` y `dist`. | `docs: add swagger documentation` |
| 13 | Pruebas | Vitest + Supertest, BD de pruebas, `TRUNCATE` entre tests, `fileParallelism: false`, casos mínimos del enunciado. | `test: add auth and task ownership tests` |
| 14 | Documentos | `README.md` (arquitectura, instalación, `.env`, curl) y `DEVELOPMENT_LOG.md` final (retos, decisiones sin IA). | `docs: add readme and development log` |
| 15 | Revisión final | Clonar en limpio, `git ls-files \| grep .env`, checklist de seguridad, grabar el video. | (sin commit) |

---

## Plantilla de bitácora (por paso)

```md
### Paso N: <nombre>
- **Prompt:** "<texto exacto>"
- **Aceptado y por qué:** ...
- **Rechazado/modificado y por qué:** ...
- **Verificación:** (curl, test, typecheck)
- **Decisión propia (si hubo):** ...
```

## Decisiones propias a defender (sin IA)
1. 404 en vez de 403 para tareas ajenas.
2. Singleton con fail-fast.
3. Filtrar siempre por `user_id` en el repositorio.
4. PUT con semántica parcial.

## Video (5–8 min)
Arquitectura (1) → Swagger: registro, login, authorize, CRUD, 404 con otro usuario (3) → código donde corregiste a la IA (1) → decisiones propias (1).
