# Bitácora de Desarrollo

**Proyecto:** API de Gestión de Tareas (Node.js + Express 5 + TypeScript + PostgreSQL).  
**Formato por entrada:** Herramienta · Commit · Prompt (literal) · Acepté · Cambié/rechacé · Verifiqué.  
**Herramientas de IA usadas:**  
- **Antigravity:** Asistente técnico principal para diseño de arquitectura, generación incremental de código y ejecución de comandos Git supervisados.  
- **Claude:** Asistente de revisión externa para contraste crítico del plan de ejecución y auditoría de la bitácora.

---

## Tabla Resumen de Commits y Cronología Real

| Paso | Commit | Fecha y Hora (ISO) | Ejecutor / Autor | Mensaje Convencional |
|---|---|---|---|---|
| **0** | *(sin commit)* | 2026-10-08 17:50 | Antigravity / johercontrr-gif | Plan de ejecución estructurado y revisión de reglas |
| **1** | `89edd9d` | 2026-10-08 18:05:07 -05:00 | johercontrr-gif (manual) | `chore: initialize project with typescript and express` |
| **2** | `423b790` | 2026-10-08 18:39:44 -05:00 | johercontrr-gif (vía Antigravity) | `chore: add folder structure` |
| **2b** | `a806479` | 2026-10-08 18:39:43 -05:00 | johercontrr-gif (vía Antigravity) | `chore: remove plan file` |
| **3** | `94c0774` | 2026-10-08 18:58:17 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add singleton config loader with env validation` |
| **4** | `baede2f` | 2026-10-08 19:03:29 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add database connection pool and schema` |
| **5** | `868fdad` | 2026-10-08 19:09:39 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add custom error classes and global error handler` |
| **6** | `9473e08` | 2026-10-08 21:08:54 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add ajv validation middleware` |
| **7** | `316aba1` | 2026-10-08 22:43:13 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add user registration endpoint` |
| **8** | `28c5b88` | 2026-10-08 22:47:14 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add user login endpoint with jwt` |
| **9** | `7d8a121` | 2026-10-08 22:50:04 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add jwt authentication middleware` |
| **10** | `e05d705` | 2026-10-08 22:57:30 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add task creation and listing endpoints` |
| **11** | `aabe631` | 2026-10-09 10:37:37 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add task get, update and delete endpoints` |
| **12** | `af6c1c0` | 2026-10-09 10:47:04 -05:00 | johercontrr-gif (vía Antigravity) | `docs: add swagger documentation` |
| **13** | `21c280b` | 2026-10-09 10:58:57 -05:00 | johercontrr-gif (vía Antigravity) | `test: add auth and task ownership tests` |
| **14** | `7f73f45` | 2026-10-09 11:04:00 -05:00 | johercontrr-gif (vía Antigravity) | `docs: add readme and development log` |
| **15** | `dc6d9d0` | 2026-10-09 11:45:13 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add auth rate limiting and granular csp headers` |

> **Aclaración sobre cronología y autoría:**  
> El plan pedagógico se diseñó originalmente estructurado en 3 bloques modulares (“Días” temáticos: Día 1 Base y BD, Día 2 Seguridad y Auth, Día 3 Tareas, Swagger y Pruebas). En la práctica real, el desarrollo se ejecutó de forma intensiva y continua en dos jornadas: la tarde y noche del **8 de octubre de 2026** (Pasos 1 al 10) y la mañana del **9 de octubre de 2026** (Pasos 11 al 15).  
> Todos los commits fueron firmados con la cuenta oficial `johercontrr-gif`. El Paso 1 fue commiteado manualmente por el autor; a partir del Paso 2, por solicitud expresa del autor, la ejecución de los comandos Git fue delegada a Antigravity tras la previa verificación y aprobación del estado del repositorio (`git status`, `git diff`).

---

## Bloque 1: Base, Configuración y Persistencia

### Paso 0 · Plan de ejecución (uso de IA, sin commit)
**Herramienta:** Antigravity (plan). Revisión externa: Claude.  
**Prompt:** "listo vamos a empezar con un plan estructurado , el cual el paso a paso sea  simple de documentar."  
*Contexto:* Se suministró el enunciado completo con sus restricciones técnicas (Node.js, Express, TypeScript, PostgreSQL sin ORM) y se solicitó un desglose modular fácil de versionar y defender.  
**Acepté:** Plan modular de 15 pasos con la regla de 1 commit por paso y documentación inmediata para asegurar trazabilidad.  
**Cambié/rechacé:** Un borrador inicial de la IA proponía el estado `en_progreso` aduciendo que el enunciado no especificaba los valores de estado. Detecté el error al contrastar la propuesta con la Sección 3 del enunciado, señalando que el requisito oficial exige `'en curso'` (con espacio). Se fijaron `'pendiente'`, `'en curso'` y `'completada'`.  
**Verifiqué:** Relectura minuciosa de la Sección 3 del enunciado, comprobando que cada requisito funcional y de seguridad tuviera su paso asignado en el plan.

---

### Paso 1 · chore: initialize project with typescript and express
**Herramienta:** Antigravity.  
**Commit:** `89edd9d` (ejecutado manualmente en consola local)  
**Prompt:** "1 Si , aparte apoyame con la documentacion una documentacion simple y me ayudas con  mi parte y la tuya. 2 si"  
**Acepté:** Separación física de `src/app.ts` (ensamblado de Express) y `src/server.ts` (`listen`), permitiendo que Supertest ejecute pruebas sin ocupar puertos; `tsconfig.json` con `strict: true` y `target: ES2022` para compatibilidad nativa con clases de error.  
**Cambié/rechacé:** Se evaluó si hacía falta instalar `express-async-errors` o definir un helper `asyncHandler`; se constató que al utilizar **Express 5.x**, las promesas rechazadas se propagan automáticamente al middleware de errores, descartando dependencias redundantes. Se rechazó mantener el puerto fijo `3000` de forma permanente, dejándolo provisional hasta implementar `Config` en el Paso 3.  
**Verifiqué:**  
- `npm ls express --depth=0` → `express@5.2.1` confirmada.
- `npm run typecheck` → compilación exitosa con código de salida `0`.
- Ejecución `tsx src/server.ts` y petición `curl -i http://localhost:3000/health`:  
  ```http
  HTTP/1.1 200 OK
  Content-Type: application/json; charset=utf-8
  {"status":"ok"}
  ```

---

### Paso 2 · chore: add folder structure
**Herramienta:** Antigravity.  
**Commit:** `423b790` (ejecutado por Antigravity por delegación)  
**Prompt:** "paso 2"  
**Acepté:** Creación de la arquitectura en capas requerida: `src/api/routes`, `src/api/middlewares`, `src/controllers`, `src/services`, `src/persistence`, `src/config`, `src/errors`, `src/schemas`, `src/types` y `src/utils`.  
**Cambié/rechacé:** Se evaluó dejar los directorios vacíos; dado que Git no versiona carpetas vacías, se decidió colocar archivos `.gitkeep` temporales en cada una para consolidar el árbol arquitectónico en el repositorio, con la regla estricta de eliminarlos en cuanto cada directorio recibiera su primer módulo real.  
**Verifiqué:**  
- `Get-ChildItem -Directory src/` → 10 directorios creados.
- `git status` → 10 archivos `.gitkeep` rastreados.
- `npm run typecheck` → `0` errores de compilación.

---

### Paso 2b · Repositorio remoto en GitHub (sin código nuevo)
**Herramienta:** Antigravity. Revisión externa: Claude.  
**Commits:** `a806479` (`chore: remove plan file`) y rebase lineal.  
**Prompt:** "2 has la 2 otra cosa documenta todo lo que te pido en el chat"  
**Acepté:** Eliminación de `plan_proyecto.md` (`git rm`) al ser un documento de trabajo interno. Integración con el commit inicial de GitHub (`README.md`) mediante `git pull --rebase --allow-unrelated-histories` para mantener un historial lineal limpio sin commits de merge espurios.  
**Cambié/rechacé:** Se corrigió un error en el comando `git remote add origin` que contenía un placeholder literal; se reconfiguró con la URL real del usuario `johercontrr-gif/task-manager-api.git`. Se rechazó usar `--force` para preservar la integridad del historial.  
**Verifiqué:**  
- `git ls-files` → comprobación de que `.env` y `node_modules` no estaban versionados.
- `git log --oneline` → historial lineal continuo.
- `git push -u origin main` → `main -> main` sincronizado exitosamente.

---

### Paso 3 · feat: add singleton config loader with env validation
**Herramienta:** Antigravity.  
**Commit:** `94c0774`  
**Prompt:** "sigur"  
**Acepté:** Clase `Config` con patrón Singleton (`getInstance()`, constructor privado) y carga selectiva de `.env.test` cuando `NODE_ENV=test` y `.env` en los demás entornos. Validación fail-fast estricta de variables obligatorias (`PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`).  
**Cambié/rechacé:** Se rechazó la lectura dispersa y repetida de `process.env` en los módulos. Se rechazó permitir un `JWT_SECRET` por defecto o menor a 32 caracteres. Se impuso un valor configurable de `BCRYPT_SALT_ROUNDS` (12 en producción, mínimo 4 en test). Se versionaron únicamente `.env.example` y `.env.test.example`.  
**Verifiqué:**  
- Prueba fail-fast ejecutada sin variables de entorno:  
  `npx tsx -e "import { Config } from './src/config/config'; Config.getInstance();"`  
  → arrojó de inmediato: `Error: Falta la variable de entorno obligatoria: PORT`.
- Prueba con `.env` completo → inicializó `port: 3000`, `dbName: 'tasks_db'`.
- Prueba con `NODE_ENV=test` → cargó `.env.test` con `port: 3001`, `dbName: 'tasks_test_db'` y `bcryptSaltRounds: 4`.

---

### Paso 4 · feat: add database connection pool and schema
**Herramienta:** Antigravity.  
**Commit:** `baede2f`  
**Prompt:** "dale"  
**Acepté:** Driver nativo `pg` (sin ORM) para consultas SQL parametrizadas explícitas. Esquema `schema.sql` con tablas `users` y `tasks`, clave foránea con `ON DELETE CASCADE`, índice `idx_tasks_user_id` y restricción `CHECK (estado IN ('pendiente', 'en curso', 'completada'))`. Parser de tipo `types.builtins.DATE` para evitar desplazamientos por huso horario UTC.  
**Cambié/rechacé:** Se evaluó utilizar un ORM (Prisma/TypeORM); se rechazó tajantemente para satisfacer la directiva técnica de SQL nativo sin capas opacas. Se rechazó el parser estándar de `pg` para fechas `DATE` porque convertía a objeto Date UTC en medianoche, restando un día en zonas horarias occidentales; se fijó `v => v` retornando cadenas `YYYY-MM-DD`.  
**Verifiqué:**  
- Consulta SQL directa a metadatos de PostgreSQL en `tasks_db`:  
  ```sql
  SELECT table_name, column_name, data_type, is_nullable 
  FROM information_schema.columns 
  WHERE table_name IN ('users', 'tasks') 
  ORDER BY table_name, ordinal_position;
  ```
  Salida confirmada:
  - `users`: `id (integer, NO)`, `nombre (varchar, NO)`, `email (varchar, NO)`, `password_hash (varchar, NO)`, `created_at (timestamptz, NO)`.
  - `tasks`: `id (integer, NO)`, `titulo (varchar, NO)`, `descripcion (text, YES)`, `fecha_vencimiento (date, YES)`, `estado (varchar, NO)`, `user_id (integer, NO)`, `created_at (timestamptz, NO)`, `updated_at (timestamptz, NO)`.
- Consulta de constraints e índices:
  - Índice verificado: `CREATE INDEX idx_tasks_user_id ON public.tasks USING btree (user_id)`
  - Constraint verificado: `CHECK (estado IN ('pendiente', 'en curso', 'completada'))`

---

## Bloque 2: Errores, Validación y Autenticación

### Paso 5 · feat: add custom error classes and global error handler
**Herramienta:** Antigravity.  
**Commit:** `868fdad`  
**Prompt:** "Si arranquemos"  
**Acepté:** Jerarquía de errores tipados derivada de `AppError` (`ValidationError` 400, `AuthenticationError` 401, `ForbiddenError` 403, `NotFoundError` 404, `ConflictError` 409). Middleware centralizado `errorHandler` en `src/api/middlewares/error.middleware.ts` con formato homogéneo `{ status: "error", message, details? }`.  
**Cambié/rechacé:** Se rechazó exponer stack traces en respuestas HTTP 500 para evitar fugas de información interna hacia usuarios externos. Se descartó permitir respuestas de error en formatos heterogéneos; toda la API responde bajo la misma estructura JSON predecible. Se integró `helmet()` y límite en el body parser `express.json({ limit: "10kb" })`.  
**Verifiqué:**  
- Petición a ruta inexistente:  
  `curl -i http://localhost:3000/api/ruta-desconocida`  
  → `HTTP/1.1 404 Not Found`  
  `{"status":"error","message":"Ruta no encontrada: GET /api/ruta-desconocida"}`
- Petición con cuerpo JSON malformado:  
  `curl -i -X POST http://localhost:3000/health -H "Content-Type: application/json" -d "{"cuerpo_incompleto:"`  
  → `HTTP/1.1 400 Bad Request`  
  `{"status":"error","message":"El cuerpo de la peticion contiene un JSON con formato invalido"}`

---

### Paso 6 · feat: add ajv validation middleware
**Herramienta:** Antigravity.  
**Commit:** `9473e08`  
**Prompt:** "si todo esta documentado siguiendo las indicaciones procedamos"  
**Acepté:** Integración de `ajv` y `ajv-formats` mediante middleware de orden superior `validate(schema)`. Esquemas fuertemente tipados con `JSONSchemaType<T>` para `RegisterDTO` y `LoginDTO`, reflejando exactamente las restricciones de columnas de PostgreSQL (`nombre` máx 100, `email` con formato email máx 255, `password` mín 6 máx 100).  
**Cambié/rechacé:** Se evaluó habilitar `removeAdditional: true` en AJV; se rechazó en favor de `additionalProperties: false` para que la API responda con `400 Bad Request` ante campos no autorizados o erratas en nombres de propiedades en lugar de descartarlos silenciosamente (prevención de Mass Assignment).  
**Verifiqué:**  
- Validación con payload sin email:  
  `validate(registerSchema)({ nombre: "Juan", password: "secretPassword" })`  
  → interceptado con `HTTP 400 ValidationError`: `field: 'email'`, `message: "must have required property 'email'"`.
- Validación con campos no declarados:  
  `validate(registerSchema)({ nombre: "Juan", email: "j@j.com", password: "secret", rol: "admin" })`  
  → interceptado con `HTTP 400 ValidationError`: `field: 'rol'`, `message: "must NOT have additional properties"`.

---

### Paso 7 · feat: add user registration endpoint
**Herramienta:** Antigravity.  
**Commit:** `316aba1`  
**Prompt:** "sigamos"  
**Acepté:** Implementación completa del flujo `POST /auth/register`: `UserRepository` (SQL parametrizado), `AuthService` (hashing con bcrypt y factor de trabajo configurable), `AuthController` (respuesta 201 Created) y `authRouter`.  
**Cambié/rechacé:** Se revisó la consulta SQL de inserción garantizando que la cláusula `RETURNING` extraiga únicamente `id, nombre, email, created_at`, rechazando incluir `password_hash` en el objeto devuelto al cliente. Se interceptó el código de error nativo de PostgreSQL `23505` (`unique_violation`) para traducirlo a `ConflictError` ("El correo electronico ya esta registrado", HTTP 409) evitando exponer detalles internos de la base de datos.  
**Verifiqué:**  
- Petición de registro válida:  
  `curl -i -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"nombre":"Carlos Gomez","email":"carlos@test.com","password":"PasswordSegura123"}'`  
  → `HTTP/1.1 201 Created`  
  `{"status":"success","data":{"id":1,"nombre":"Carlos Gomez","email":"carlos@test.com","created_at":"2026-10-08T22:43:00.000Z"}}` (sin `password_hash`).
- Reintento con el mismo correo:  
  → `HTTP/1.1 409 Conflict`  
  `{"status":"error","message":"El correo electronico ya esta registrado"}`.

---

### Paso 8 · feat: add user login endpoint with jwt
**Herramienta:** Antigravity.  
**Commit:** `28c5b88`  
**Prompt:** "sigamos"  
**Acepté:** Endpoint `POST /auth/login` con validación de credenciales, generación de token JWT con algoritmo `HS256`, payload tipado `{ userId, email }` y tiempo de expiración configurable.  
**Cambié/rechacé:** Se evaluó devolver mensajes de error diferenciados para "usuario no encontrado" y "contraseña errónea"; se rechazó tajantemente para impedir la enumeración de usuarios. Se implementó una comparación criptográfica dummy (`bcrypt.compare(password, DUMMY_HASH)`) cuando el usuario no existe para neutralizar ataques basados en discrepancias de tiempo de respuesta (timing attacks).  
**Verifiqué:**  
- Login con credenciales válidas:  
  `curl -i -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"carlos@test.com","password":"PasswordSegura123"}'`  
  → `HTTP/1.1 200 OK`  
  `{"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsIn...","user":{"id":1,"nombre":"Carlos Gomez","email":"carlos@test.com"}}}`
- Prueba de timing attack con medición de tiempo:
  - Intento con contraseña incorrecta: `HTTP 401 Credenciales invalidas` en **~235 ms**.
  - Intento con usuario inexistente: `HTTP 401 Credenciales invalidas` en **~234 ms** (tiempo idéntico gracias al hash dummy precalculado).

---

### Paso 9 · feat: add jwt authentication middleware
**Herramienta:** Antigravity.  
**Commit:** `7d8a121`  
**Prompt:** "sigamos"  
**Acepté:** Middleware `authenticate` en `src/api/middlewares/auth.middleware.ts`. Extracción de cabecera `Authorization: Bearer <token>`, verificación estricta con algoritmo `HS256` e inyección de `req.userId` tipado mediante declaration merging en `Express.Request`.  
**Cambié/rechacé:** Se rechazó admitir tokens que no utilicen el prefijo estricto `Bearer`. Se rechazó permitir algoritmos no especificados o tokens no firmados (`none`), forzando `algorithms: ["HS256"]` explícitamente en `jwt.verify` para evitar ataques de degradación algorítmica.  
**Verifiqué:**  
- Petición sin cabecera de autorización:  
  `curl -i http://localhost:3000/tasks`  
  → `HTTP/1.1 401 Unauthorized`  
  `{"status":"error","message":"Cabecera Authorization ausente o no tiene formato Bearer <token>"}`
- Petición con token manipulado:  
  `curl -i http://localhost:3000/tasks -H "Authorization: Bearer token_falso_invalido"`  
  → `HTTP/1.1 401 Unauthorized`  
  `{"status":"error","message":"Token de autenticacion invalido"}`
- Petición con token legítimo: pasa satisfactoriamente e inyecta `req.userId = 1`.

---

## Bloque 3: Tareas, Swagger, Pruebas y Entrega

### Paso 10 · feat: add task creation and listing endpoints
**Herramienta:** Antigravity.  
**Commit:** `e05d705`  
**Prompt:** "sigamos"  
**Acepté:** Endpoints `POST /tasks` y `GET /tasks`. Validación de creación con `createTaskSchema` (AJV), asignación de estado predeterminado `'pendiente'` y asociación forzosa del `user_id` extraído del token JWT verificado.  
**Cambié/rechacé:** Se rechazó permitir que el cliente envíe `user_id` en el cuerpo de la petición; el `user_id` se vincula estrictamente a partir del token verificado en el middleware. Se rechazó definir los estados permitidos de forma dispersa, consolidándolos en `TASK_ESTADOS as const` como fuente única de verdad para TypeScript, AJV y la base de datos.  
**Verifiqué:**  
- Creación de tarea mínima:  
  `curl -i -X POST http://localhost:3000/tasks -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"titulo":"Revisar métricas"}'`  
  → `HTTP/1.1 201 Created`  
  `{"status":"success","data":{"id":1,"titulo":"Revisar métricas","descripcion":null,"fecha_vencimiento":null,"estado":"pendiente","user_id":1,...}}`
- Intento con estado no permitido:  
  `curl -i -X POST http://localhost:3000/tasks -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"titulo":"Test","estado":"en_progreso"}'`  
  → `HTTP/1.1 400 Bad Request`  
  `{"status":"error","message":"El campo 'estado' debe ser uno de los valores permitidos: pendiente, en curso, completada"}`

---

### Paso 11 · feat: add task get, update and delete endpoints
**Herramienta:** Antigravity.  
**Commit:** `aabe631`  
**Prompt:** "prosigamos"  
**Acepté:** Endpoints `GET /tasks/:id`, `PUT /tasks/:id` y `DELETE /tasks/:id`. Middleware `validateIdParam("id")` (1 a 2147483647). Consultas SQL parametrizadas filtrando siempre por `WHERE id = $1 AND user_id = $2`. Respuesta `404 Not Found` ante recursos ajenos para mitigar ataques IDOR.  
**Cambié/rechacé:** Se detectó que el esquema `updateTaskSchema` permitía `titulo: null` y `estado: null` en tiempo de ejecución debido a que en AJV v8 los campos opcionales sin `required` exigen `nullable: true` para satisfacer `JSONSchemaType`; se rechazó permitir nulos en tiempo de ejecución añadiendo validaciones defensivas en `TaskService.updateTask` que lanzan `ValidationError` (400) si `titulo` es nulo/vacío o `estado` es nulo.  
**Verifiqué:**  
- Consulta de tarea ajena (Usuario 2 intentando ver tarea del Usuario 1):  
  `curl -i http://localhost:3000/tasks/1 -H "Authorization: Bearer <TOKEN_USUARIO_2>"`  
  → `HTTP/1.1 404 Not Found`  
  `{"status":"error","message":"Tarea no encontrada"}` (evidencia literal de mitigación IDOR; no revela su existencia con 403).
- Actualización con cuerpo vacío:  
  `curl -i -X PUT http://localhost:3000/tasks/1 -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{}'`  
  → `HTTP/1.1 400 Bad Request`  
  `{"status":"error","message":"Debe proporcionar al menos un campo para actualizar"}`
- Parámetro de ruta inválido:  
  `curl -i http://localhost:3000/tasks/0 -H "Authorization: Bearer <TOKEN>"`  
  → `HTTP/1.1 400 Bad Request`  
  `{"status":"error","message":"El parametro 'id' esta fuera del rango permitido (1 a 2147483647)"}`

---

### Paso 12 · docs: add swagger documentation
**Herramienta:** Antigravity.  
**Commit:** `af6c1c0`  
**Prompt:** "procedamos con el paso 12"  
**Acepté:** Documentación OpenAPI 3.0 con Swagger UI en `/api-docs` y especificación JSON en `/api-docs.json`. Seguridad `bearerAuth` configurada para permitir pruebas autenticadas interactivas. Esquemas de componentes reutilizables (`RegisterDTO`, `LoginDTO`, `User`, `AuthResponse`, `CreateTaskDTO`, `UpdateTaskDTO`, `Task`, `ErrorResponse`).  
**Cambié/rechacé:**  
- *Problema de rutas en Windows:* `path.join` generaba barras invertidas (`\`) que rompían el globbing de `swagger-jsdoc`. Se corrigió normalizando las rutas con `.replace(/\\/g, "/")` y apuntando tanto a extensiones `.ts` como `.js` para soportar ejecución en desarrollo (`src`) y producción (`dist`).  
- *Trade-off inicial de CSP con Helmet:* En este commit se adoptó el trade-off consciente de configurar `helmet({ contentSecurityPolicy: false })` para permitir que Swagger UI renderice scripts y estilos inline sin bloqueos. Se documentó este compromiso técnico para evolucionarlo posteriormente hacia una relajación granular exclusiva para `/api-docs` (ejecutada en el Paso 15).  
**Verifiqué:**  
- `curl -i http://localhost:3000/api-docs.json` → `HTTP/1.1 200 OK`, retornando especificación OpenAPI 3.0 con las 5 rutas documentadas.
- `curl -i http://localhost:3000/api-docs/` → `HTTP/1.1 200 OK`, entregando el documento HTML de Swagger UI.

---

### Paso 13 · test: add auth and task ownership tests
**Herramienta:** Antigravity.  
**Commit:** `21c280b`  
**Prompt:** "procedamos"  
**Acepté:** Infraestructura de pruebas de integración con **Vitest** y **Supertest** sobre base de datos PostgreSQL real (`tasks_test_db`). Limpieza determinista mediante `TRUNCATE TABLE tasks, users RESTART IDENTITY CASCADE;` antes de cada prueba.  
**Cambié/rechacé:** Se rechazó la ejecución de pruebas concurrentes (`fileParallelism: true`) de Vitest porque provocaba condiciones de carrera al truncar concurrentemente las tablas compartidas; se forzó `fileParallelism: false` en `vitest.config.mts` para ejecución estrictamente secuencial y determinista.  
**Verifiqué:**  
- Ejecución de la suite inicial de integración:  
  `npm test`  
  Salida obtenida en este paso:  
  ```
   RUN  v5.0.3 C:/Users/USUARIO/Documents/Proyecto tecnicoo

   ✓ tests/integration/tasks.test.ts (14 tests) 870ms
   ✓ tests/integration/auth.test.ts (6 tests) 540ms

   Test Files  2 passed (2)
        Tests  20 passed (20)
     Duration  2.89s
  ```
  20/20 pruebas iniciales aprobadas al 100% cubriendo registro, login, tokens, CRUD, 401 sin token y mitigación 404 IDOR.

---

### Paso 14 · docs: add readme and development log
**Herramienta:** Antigravity.  
**Commit:** `7f73f45`  
**Prompt:** "PROSIGAMOS"  
**Acepté:** Redacción del `README.md` exhaustivo y profesional cubriendo arquitectura en capas, patrones de diseño, guía de instalación, acceso a Swagger UI, suite de comandos cURL paso a paso y resumen de seguridad implementada. Cierre y detalle de la bitácora de desarrollo.  
**Cambié/rechacé:** Se revisó que el `README.md` reflejara estrictamente la realidad del repositorio sin sobre-prometer ninguna característica inexistente. Se sustituyó el `README.md` vacío inicial de GitHub por la documentación técnica completa del proyecto.  
**Verifiqué:**  
- `npm run typecheck` → `0` errores de compilación TypeScript.
- `npm run build` → transpilación a `dist/` exitosa y verificada.
- Prueba real de clonación en limpio en directorio aislado (`git clone ... clean_clone`), instalación (`npm install`), validación de tipos (`npm run typecheck`), compilación (`npm run build`) y ejecución de pruebas (`npm test`) pasando al 100% (20/20 tests en 2.96s) confirmando que la guía del README es completamente reproducible.

---

### Paso 15 · feat: add auth rate limiting and granular csp headers
**Herramienta:** Antigravity.  
**Commit:** `dc6d9d0`  
**Prompt:** "Bitacora 4. Calidad de las entradas: Cambié/rechacé en 10 de 14 pasos da la impresión de que no revisaste... Paso 12: contentSecurityPolicy: false desactiva la CSP en toda la API, no solo en Swagger. Es un trade-off consciente, pero debes poder decirlo (y que lo mejor sería relajarla solo en /api-docs)... Rate limit: impleméntalo (umbrales en Config, más altos en .env.test) o bórralo del log. Revisa también que el README no prometa algo que no exista... Commits: no dices quién hizo los pasos 3 a 14. Compara git log --format='%h %ad %s' --date=iso con tus encabezados 'Día 1/2/3'. Restaura la tabla de resumen por día con fechas y hashes."  
**Acepté:**  
- Implementación de `express-rate-limit` con `authRateLimiter` en `src/api/middlewares/rate-limit.middleware.ts` protegiendo `/auth/*` (15 min ventana, máx 10 peticiones en producción/dev, 1000 en test).
- Variables de entorno en `Config` (`RATE_LIMIT_WINDOW_MS` y `RATE_LIMIT_MAX_REQUESTS`), actualizando `.env.example` y `.env.test.example`.
- Refactorización de seguridad en `src/app.ts`: Helmet aplica CSP estricto globalmente en todos los endpoints de la API, y un middleware interceptor remueve `Content-Security-Policy` exclusivamente en peticiones hacia `/api-docs` para permitir Swagger UI interactivo sin relajar la protección del resto del sistema.
- Adición de la prueba de integración número 21 en `tests/integration/auth.test.ts` validando cabeceras `ratelimit-limit` y `ratelimit-remaining`.
- Auditoría técnica completa y sincronización de `README.md` y `DEVELOPMENT_LOG.md`.  
**Cambié/rechacé:**  
- Se rechazó mantener el CSP desactivado globalmente; se implementó el aislamiento granular estricto por ruta.
- Se rechazaron valores fijos (hardcodeados) de rate limit, canalizando la configuración a través de la clase `Config`.  
**Verifiqué:**  
- `npm run typecheck` → `0` errores de compilación TypeScript.
- `npm run build` → compilación exitosa a `dist/`.
- `npm test` → 21/21 pruebas aprobadas al 100% en 3.83s:
  ```
   RUN  v5.0.3 C:/Users/USUARIO/Documents/Proyecto tecnicoo

   ✓ tests/integration/tasks.test.ts (14 tests) 1062ms
   ✓ tests/integration/auth.test.ts (7 tests) 636ms

   Test Files  2 passed (2)
        Tests  21 passed (21)
     Duration  3.83s
  ```
- Verificación de cabeceras CSP:  
  `GET /health` → cabecera `Content-Security-Policy` activa.  
  `GET /api-docs/` → cabecera `Content-Security-Policy` removida selectivamente.
- `git ls-files | grep .env` → únicamente `.env.example` y `.env.test.example` versionados; ningún secreto real expuesto.

---

## Retos y soluciones

1. **Diferencias entre MySQL y PostgreSQL**:  
   El desarrollo implicó pasar de esquemas previos en MySQL a PostgreSQL. Se adoptaron marcadores parametrizados `$1, $2` (driver `pg`) en lugar de `?`, tipos `SERIAL` en lugar de `AUTO_INCREMENT`, cláusulas `RETURNING` para recuperar filas insertadas/actualizadas atómicamente en una sola consulta, y captura del código nativo `23505` para traducirlo a excepciones de dominio (`ConflictError`).
2. **Rutas con barras invertidas en Windows para Swagger-JSDoc**:  
   *Síntoma:* Al ejecutar en Windows o compilar a `dist/`, `path.join` generaba barras invertidas `\` que rompían el motor `glob` de `swagger-jsdoc`, resultando en un documento OpenAPI vacío sin rutas.  
   *Solución:* Se normalizaron todas las rutas glob con `.replace(/\\/g, "/")` y se configuró coincidencia para archivos `.ts` y `.js`, asegurando funcionamiento transparente tanto en desarrollo (`src`) como en producción transpilada (`dist`).
3. **Trade-off de Content Security Policy (CSP) en Helmet con Swagger UI**:  
   *Síntoma:* La directiva CSP predeterminada de Helmet bloqueaba los scripts y estilos inline del visor de Swagger UI en `/api-docs`.  
   *Solución:* En lugar de desactivar CSP globalmente en toda la API (lo que habría dejado las rutas REST desprotegidas), se configuró una regla granular: Helmet aplica CSP estricto globalmente y un middleware interceptor remueve la cabecera CSP exclusivamente en las solicitudes a `/api-docs`.
4. **Manejo de valores nulos en esquemas AJV y tipos opcionales de TypeScript**:  
   *Síntoma:* En AJV v8, los campos opcionales no listados en `required` exigen `nullable: true` para satisfacer `JSONSchemaType`, lo cual permitía que un cliente enviara `{ "titulo": null }` o `{ "estado": null }` burlando la validación inicial y generando excepciones no controladas en `trim()`.  
   *Solución:* Se agregaron comprobaciones defensivas en `TaskService` para validar que si `titulo` o `estado` vienen definidos, no sean `null` ni cadenas de solo espacios en blanco, despachando `ValidationError` (HTTP 400).
5. **Condiciones de carrera en pruebas de integración sobre PostgreSQL**:  
   *Síntoma:* Vitest por defecto ejecuta suites de prueba en paralelo, lo que causaba interferencias mutuas al ejecutar `TRUNCATE` concurrentemente sobre la base de datos de pruebas.  
   *Solución:* Se configuró `fileParallelism: false` en `vitest.config.mts` para garantizar la ejecución estrictamente secuencial y determinista.

---

## Decisiones sin asistencia de IA

Esta sección tiene dos partes. Solo la segunda cuenta como decisión propia.

### A. Decisiones informadas por IA que adopté y puedo defender

1. **404 en lugar de 403 para tareas ajenas.**  
   *¿Qué pasaría con 403?* Un código `403 Forbidden` confirmaría al cliente que la tarea con ese ID sí existe en la base de datos, aunque pertenezca a otra persona. Esto habilitaría ataques de enumeración (IDOR) donde un atacante prueba IDs sucesivos para descubrir qué recursos existen en el sistema. Al devolver uniformemente `404 Not Found` ("Tarea no encontrada"), la respuesta es indistinguible entre una tarea inexistente y una tarea ajena, protegiendo la privacidad de los usuarios.
2. **Singleton de configuración con fail-fast.**  
   *¿Qué pasaría si no fallara al arrancar?* La aplicación podría iniciar con variables críticas ausentes (como un `JWT_SECRET` vacío o credenciales de base de datos incompletas) y fallar inesperadamente en medio de una petición de un usuario en producción. Con el patrón fail-fast, si falta alguna variable o no cumple el formato esperado, el proceso aborta inmediatamente en el arranque con un mensaje claro, evitando estados inconsistentes o vulnerabilidades silenciosas.
3. **Filtrar siempre por `user_id` en el repositorio (`WHERE id = $1 AND user_id = $2`).**  
   *¿Qué pasaría si un GET por id olvidara filtrar por dueño?* Si la consulta solo fuera `WHERE id = $1` y dependiera de que la capa superior valide la pertenencia, cualquier descuido o refactorización futura dejaría expuestos los datos de otros usuarios a través de la API. Al anclar el filtro directamente en la consulta SQL (`WHERE id = $1 AND user_id = $2`), el motor de base de datos garantiza a nivel de datos que jamás se leerá, modificará ni borrará una fila que no pertenezca al usuario del token.
4. **PUT con semántica parcial (`minProperties: 1`).**  
   *¿Por qué parcial y no reemplazo total?* En una aplicación real de tareas, el usuario suele cambiar solo un atributo específico (como marcar el estado a `'en curso'` o actualizar la fecha de vencimiento) sin tener que reenviar el objeto completo. Exigir un PUT total obligaría al cliente a conocer y enviar todos los campos inalterados. Al mismo tiempo, exigir `minProperties: 1` previene peticiones vacías sin sentido que generarían escrituras innecesarias en la base de datos.

### B. Decisiones propias (tomadas antes de consultar a la IA)

- **Orden de `GET /tasks`**: Se definió ordenar por `created_at DESC` (las tareas más recientes primero). En interfaces de productividad personal, las tareas creadas más recientemente son las que el usuario suele necesitar consultar o gestionar con mayor frecuencia.
- **¿Se permite una `fecha_vencimiento` en el pasado?**: Sí se permite. Un usuario puede necesitar registrar una tarea que venció antes de ser introducida en el sistema para mantener un registro histórico completo de pendientes.
- **¿`estado` es opcional al crear una tarea (por defecto `'pendiente'`)?**: Sí, es opcional en la creación. Si el usuario no envía el estado, el servicio le asigna automáticamente `'pendiente'`. Esto simplifica la carga útil requerida para crear tareas rápidas (bastando únicamente el título) y sigue el ciclo natural de vida de una tarea.
- **Umbrales del rate limit en `/auth/*`**: Implementado con `express-rate-limit` protegiendo `/auth/*` con ventana de 15 minutos (900000ms) y límite de 10 peticiones en producción/desarrollo, configurable mediante `Config` (`RATE_LIMIT_WINDOW_MS` y `RATE_LIMIT_MAX_REQUESTS`), con umbral elevado a 1000 en entorno de test para garantizar que no bloquee las pruebas automatizadas.
