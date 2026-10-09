# Bitácora de Desarrollo

Proyecto: API de Gestión de Tareas (Node.js + Express + TypeScript + PostgreSQL).
Se actualiza al terminar cada paso, no al final. Formato fijo por entrada:
Herramienta · Prompt (literal) · Acepté · Cambié/rechacé · Verifiqué.

Herramientas de IA usadas:
- Antigravity: plan y código de cada paso.
- Claude (segundo asistente): revisión externa de esta bitácora y del plan.

---

## Día 1

### Paso 0 · Plan de ejecución (uso de IA, sin commit)
**Herramienta:** Antigravity (plan). Revisión externa: Claude.
**Prompt:** "listo vamos a empezar con un plan estructurado , el cual el paso a paso sea  simple de documentar."
Contexto: antes se pegó el enunciado completo de la prueba con su [CONTEXTO] y se pidió adaptar a 3 días y a código simple.
**Acepté:** Plan de 15 pasos en 3 días, un commit por paso, porque sigue las capas del enunciado y cada paso se puede documentar de inmediato.
**Cambié/rechacé:** Un plan previo proponía el estado `en_progreso` diciendo que el enunciado no nombraba los valores; es falso, el enunciado define `'en curso'`. Se corrigió a `'pendiente'`, `'en curso'`, `'completada'`. También se redujo de 4 a 3 días.
Quién detectó el error: [COMPLETAR: la IA o yo, y quién lo señaló primero].
**Verifiqué:** Releí la sección 3 del enunciado y comparé los valores de estado; revisé que cada requisito tuviera un paso en el plan.

### Paso 1 · chore: initialize project with typescript and express
**Herramienta:** Antigravity.
**Commit:** `89edd9d` (el original `6be3930` cambió con el rebase del Paso 2b)
**Prompt:** "1 Si , aparte apoyame con la documentacion una documentacion simple y me ayudas con  mi parte y la tuya. 2 si"
Contexto: la herramienta había preguntado (1) si el usuario de PostgreSQL era `postgres` y el puerto `5432`, y (2) si empezábamos con el Paso 1.
**Acepté:** Separar `src/app.ts` (configura Express) de `src/server.ts` (hace `listen`), para que Supertest importe `app` sin abrir un puerto; `tsconfig` con `strict` y `target: ES2022` para que `instanceof` funcione con las clases de error.
**Cambié/rechacé:** Nada del código generado. El puerto `3000` queda fijo en `server.ts` solo de forma temporal y se reemplaza por `Config` en el Paso 3.
**Verifiqué:**
- `npm ls express --depth=0` → `express@5.2.1` (lo instalado, no solo lo publicado). En Express 5 las promesas rechazadas llegan solas al middleware de errores, por eso no hace falta `asyncHandler`.
- `npm run typecheck` → terminó sin errores.
- `tsx src/server.ts` + `GET http://localhost:3000/health` → `{"status":"ok"}`.

### Paso 2 · chore: add folder structure
**Herramienta:** Antigravity.
**Commit:** `423b790`
**Prompt:** "paso 2"
Contexto: antes se había acordado el plan de 15 pasos; el Paso 2 es crear la estructura en capas del enunciado.
**Acepté:** Crear `src/api/routes`, `src/api/middlewares`, `src/controllers`, `src/services`, `src/persistence`, `src/config`, `src/errors`, `src/schemas`, `src/types` y `src/utils`, porque separan responsabilidades: controllers sin lógica de negocio, services sin SQL y repositories sin reglas de negocio.
**Cambié/rechacé:** Nada. Se agregó un archivo `.gitkeep` en cada carpeta vacía, porque Git no versiona carpetas vacías; cada `.gitkeep` se borra cuando la carpeta recibe su primer archivo real.
**Verifiqué:**
- Listado de `src/` → las 10 carpetas existen, cada una con su `.gitkeep`, junto a `app.ts` y `server.ts`.
- `npm run typecheck` → terminó sin errores.

### Paso 2b · Repositorio remoto en GitHub (sin código nuevo)
**Herramienta:** Antigravity (ejecutó los comandos Git a mi pedido). Revisión externa de la secuencia: Claude.
**Commits:** `a806479` (`chore: remove plan file`) y `423b790` (Paso 2).
**Prompt:** "2 has la 2 otra cosa documenta todo lo que te pido en el chat"
Contexto: la herramienta preguntó si yo ejecutaba los commits (opción 1) o ella (opción 2); elegí la 2.
**Acepté:**
- Borrar `plan_proyecto.md` del repositorio (`git rm`): es una copia del plan de la IA, no parte del proyecto.
- Unir el historial local con el del repo de GitHub, que se creó con un `README.md`, usando `git pull --rebase --allow-unrelated-histories`. Elegí `rebase` y no `merge` para mantener un historial lineal, y no `--force` para no perder el commit inicial de GitHub.
**Cambié/rechacé:**
- El primer `git remote add origin` falló porque copié `<tu-usuario>` literal; se corrigió con `git remote set-url` y mi usuario real.
- Se usó `--autostash` en el pull porque `DEVELOPMENT_LOG.md` tenía cambios sin commitear.
- Una revisión externa mencionaba un archivo `implementation_plan.md`, que no existe en este proyecto; comprobé con `git status` y el archivo real era `plan_proyecto.md`.
**Verifiqué:**
- `git ls-files` → no hay `.env` ni `node_modules` versionados.
- `git log --oneline` tras el rebase → `423b790`, `a806479`, `89edd9d`, `2a6fa14 Initial commit`.
- `git push -u origin main` → `2a6fa14..423b790  main -> main`.
- Como el rebase reescribe los hashes, los hashes de la bitácora se copiaron después del push.

### Paso 3 · feat: add singleton config loader with env validation
**Herramienta:** Antigravity.
**Commit:** `94c0774`
**Prompt:** "sigur"
Contexto: desarrollo del Paso 3 del plan (clase `Config` Singleton con validación de entorno fail-fast).
**Acepté:**
- Clase `Config` con patrón Singleton (`getInstance()`, constructor privado) para evitar lecturas repetidas de `process.env`.
- Carga de `.env.test` cuando `NODE_ENV=test` y `.env` en cualquier otro caso.
- Validación fail-fast: si falta alguna variable obligatoria o un número es inválido, lanza un error claro al arrancar.
- Reglas de seguridad: `JWT_SECRET` exige mínimo 32 caracteres sin valor por defecto; `BCRYPT_SALT_ROUNDS` configurable (12 por defecto, mínimo 4 en pruebas).
- Archivos `.env.example` y `.env.test.example` versionados; `.env` y `.env.test` ignorados en `.gitignore`.
- Actualización de `src/server.ts` para usar el puerto dinámico de `Config.getInstance().port`.
**Cambié/rechacé:** Nada del código generado. Se comprobó que los `.env` reales estén en `.gitignore`.
**Verifiqué:**
- `npm run typecheck` → terminó sin errores.
- Prueba fail-fast sin `.env` → lanzó `Error: Falta la variable de entorno obligatoria: PORT` de inmediato.
- Carga con `.env` → cargó puerto 3000, base `tasks_db` y clave JWT válida.
- Carga con `NODE_ENV=test` → cargó `.env.test` con puerto 3001, base `tasks_test_db` y salt 4.
- `git ls-files` → solo `.env.example` y `.env.test.example` están bajo control de versiones.

### Paso 4 · feat: add database connection pool and schema
**Herramienta:** Antigravity.
**Commit:** `baede2f`
**Prompt:** "dale"
Contexto: desarrollo del Paso 4 del plan (conexión a PostgreSQL con driver `pg`, parser de `DATE`, tipos y esquema SQL).
**Acepté:**
- Instalación de `pg` y `@types/pg` para interactuar con PostgreSQL mediante consultas SQL explícitas y parametrizadas (sin ORM).
- Creación de `src/persistence/schema.sql` con tablas `users` y `tasks`, restricción `CHECK (estado IN ('pendiente', 'en curso', 'completada'))`, clave foránea con `ON DELETE CASCADE` e índice `idx_tasks_user_id`.
- Definición de constante inmutable `TASK_ESTADOS as const` en `src/types/task.types.ts` como fuente única de verdad para tipos de TypeScript, validadores y base de datos.
- Registro del type parser `types.setTypeParser(types.builtins.DATE, v => v)` en `src/persistence/db.ts` para evitar desfases de fecha por zona horaria.
- Creación de `docker-compose.yml` montando `schema.sql` en `/docker-entrypoint-initdb.d` como alternativa a PostgreSQL local.
**Cambié/rechacé:** Nada del código generado. Se cuidó que el valor del estado sea exactamente `'en curso'` (con espacio) coincidiendo con el enunciado.
**Verifiqué:**
- `npm ls pg --depth=0` → `pg@8.23.1`.
- `npm run typecheck` → terminó sin errores.
- Inicialización del Pool (`getPool()`) enlazando correctamente las variables de `Config`.

## Día 2

### Paso 5 · feat: add custom error classes and global error handler
**Herramienta:** Antigravity.
**Commit:** `868fdad`
**Prompt:** "Si arranquemos"
Contexto: desarrollo del Paso 5 del plan (clases de error personalizadas y middleware global de errores).
**Acepté:**
- Jerarquía de errores tipados con clase base `AppError` (`statusCode`, `details?`, `isOperational = true`) y derivadas: `ValidationError` (400), `AuthenticationError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ConflictError` (409).
- Middleware global `errorHandler` en `src/api/middlewares/error.middleware.ts` con formato unificado `{ status: "error", message, details? }`.
- Ocultamiento de stack traces en errores 500 para evitar fugas de información interna.
- Manejo de JSON malformado (error de sintaxis de body-parser respondido con 400).
- Middleware `notFoundHandler` para responder 404 en rutas inexistentes.
- Instalación de `helmet` y límite `express.json({ limit: "10kb" })` en `src/app.ts` para seguridad transversal.
**Cambié/rechacé:** Nada del código generado.
**Verifiqué:**
- `npm ls helmet --depth=0` → `helmet@8.3.0`.
- `npm run typecheck` → terminó sin errores.
- Prueba real `GET /ruta-inexistente` → 404 `{"status":"error","message":"Ruta no encontrada: GET /ruta-inexistente"}`.
- Prueba real `POST /health` con JSON inválido → 400 `{"status":"error","message":"El cuerpo de la peticion contiene un JSON con formato invalido"}`.

### Paso 6 · feat: add ajv validation middleware
**Herramienta:** Antigravity.
**Commit:** `9473e08`
**Prompt:** "si todo esta documentado siguiendo las indicaciones procedamos"
Contexto: desarrollo del Paso 6 del plan (middleware `validate(schema)` con AJV + `ajv-formats`, esquemas de registro y login con límites de BD y `additionalProperties: false`).
**Acepté:**
- Instalación y configuración de `ajv` y `ajv-formats` con `allErrors: true` y `removeAdditional: false`.
- Middleware de orden superior `validate(schema)` en `src/api/middlewares/validate.middleware.ts` que compila esquemas y, ante fallos, extrae los campos (`instancePath`, `missingProperty`, `additionalProperty`) y despacha `ValidationError` (HTTP 400) hacia el middleware global de errores.
- Esquemas de autenticación en `src/schemas/auth.schema.ts` (`registerSchema` y `loginSchema`) fuertemente tipados con `JSONSchemaType<RegisterDTO>` y `JSONSchemaType<LoginDTO>`, restringiendo propiedades extra (`additionalProperties: false`) y reflejando exactamente las restricciones de la base de datos (`nombre` máx 100, `email` máx 255 con formato email, `password` mín 6 máx 100).
- Eliminación de `src/schemas/.gitkeep` al agregar el primer archivo real a la carpeta.
**Cambié/rechacé:** Nada del código generado.
**Verifiqué:**
- `npm ls ajv ajv-formats --depth=0` → `ajv@8.20.0`, `ajv-formats@3.0.1`.
- `npm run typecheck` → terminó sin errores.
- Pruebas de validación: paso exitoso con payloads válidos, rechazo y captura de campos obligatorios faltantes (`email`, `password`), rechazo de propiedades adicionales inesperadas (`extraField`) y validación de formato de email (`format: "email"`).

### Paso 7 · feat: add user registration endpoint
**Herramienta:** Antigravity.
**Commit:** `316aba1`
**Prompt:** "sigamos"
**Contexto:** desarrollo del Paso 7 del plan (endpoint `POST /auth/register` con capas completas: repositorio, servicio, controlador y ruta).
**Acepté:**
- Instalación de `bcrypt` y `@types/bcrypt` para hash seguro de contraseñas con el factor de trabajo configurado en `Config` (`bcryptSaltRounds`).
- Creación de `src/persistence/user.repository.ts` con consultas SQL parametrizadas explícitas (`INSERT INTO users (...) VALUES ($1, $2, $3) RETURNING ...`).
- Traducción del código de error `23505` (`unique_violation`) de PostgreSQL a `ConflictError` ("El correo electronico ya esta registrado", HTTP 409) para no exponer detalles internos del motor de base de datos.
- Creación de `src/services/auth.service.ts` encargándose de la lógica de negocio: normalización de email (minúsculas y trim), limpieza del nombre y hash con bcrypt antes de persistir.
- Creación de `src/controllers/auth.controller.ts` para responder HTTP 201 Created con `{ status: "success", data: user }` omitiendo `password_hash`.
- Integración en `src/api/routes/auth.routes.ts` con middleware `validate(registerSchema)` y montaje en `src/app.ts` bajo `/auth`.
- Eliminación de archivos `.gitkeep` en `src/api/routes`, `src/controllers` y `src/services` al recibir sus primeros archivos reales.
**Cambié/rechacé:** Nada del código generado.
**Verifiqué:**
- `npm ls bcrypt --depth=0` → `bcrypt@6.0.0`.
- `npm run typecheck` → terminó sin errores.
- Pruebas de flujo: normalización de email a minúsculas y trim de nombre, hashing de contraseña con bcrypt verificado con `bcrypt.compare`, exclusión de `password_hash` en el objeto devuelto y traducción de error PostgreSQL `23505` a `ConflictError` (HTTP 409).

### Paso 8 · feat: add user login endpoint with jwt
**Herramienta:** Antigravity.
**Commit:** `28c5b88`
**Prompt:** "sigamos"
**Contexto:** desarrollo del Paso 8 del plan (endpoint `POST /auth/login` con validación de credenciales, protección contra timing attacks mediante hash dummy y generación de tokens JWT con algoritmo HS256).
**Acepté:**
- Instalación de `jsonwebtoken` y `@types/jsonwebtoken` para la generación y firma de tokens JWT.
- Incorporación de tipos `AuthResponse` y `JwtPayload` en `src/types/user.types.ts` con `userId` y `email`.
- Implementación de método `login` en `src/services/auth.service.ts`:
  - Normalización de correo a minúsculas y sin espacios.
  - Mitigación de timing attacks / enumeración de usuarios: si el usuario no existe en la base de datos, se ejecuta igualmente `bcrypt.compare` contra un `DUMMY_HASH` precalculado con coste 12, manteniendo el tiempo de respuesta uniforme.
  - Mensaje genérico de error de autenticación: tanto para usuario inexistente como para contraseña incorrecta se lanza `AuthenticationError` ("Credenciales invalidas", HTTP 401).
  - Firma explícita del token JWT con algoritmo `HS256`, clave secreta validada de `Config` y tiempo de expiración configurable (`jwtExpiresIn`).
  - Retorno de token y objeto de usuario seguro (sin `password_hash`).
- Implementación del controlador `login` en `src/controllers/auth.controller.ts` respondiendo HTTP 200 OK con `{ status: "success", data: { token, user } }`.
- Configuración de la ruta `POST /login` en `src/api/routes/auth.routes.ts` validada con `validate(loginSchema)` (AJV).
**Cambié/rechacé:** Nada del código generado.
**Verifiqué:**
- `npm ls jsonwebtoken --depth=0` → `jsonwebtoken@9.0.3`.
- `npm run typecheck` → terminó sin errores.
- Pruebas de flujo de login:
  - Login exitoso con credenciales válidas generando token JWT con cabecera `alg: HS256` y payload decodificable `{ userId, email }`.
  - Rechazo de contraseña inválida con HTTP 401 y mensaje "Credenciales invalidas".
  - Rechazo de usuario inexistente con HTTP 401 y tiempo de respuesta equiparable (~235ms) gracias a la comparación contra el hash dummy.

---

## Retos y soluciones

Hubo varios retos desde el inicio: aprender a usar PostgreSQL y Docker, y estructurar el proyecto en capas, porque antes solo había trabajado con MySQL. Revisé documentación e información de internet, y usé la IA como apoyo, revisando lo que producía.

Diferencias MySQL → PostgreSQL que se aplican en este proyecto:
- Placeholders: `$1, $2` en PostgreSQL (driver `pg`) en lugar de `?` en MySQL.
- Clave autoincremental: `SERIAL` en lugar de `AUTO_INCREMENT`.
- `RETURNING`: PostgreSQL devuelve la fila insertada o actualizada en la misma consulta; en MySQL hay que hacer otro `SELECT`.
- Errores: PostgreSQL usa códigos como `23505` (violación UNIQUE), que el repositorio traduce a un error de dominio.

Evidencia de supervisar a la IA:
- Detecté que el plan decía `en_progreso` cuando el enunciado dice `'en curso'` y lo corregí (Paso 0).
- Los commits de los Pasos 2 y 2b los ejecutó la herramienta porque se lo pedí; yo revisé el estado del repositorio antes (`git status`, `git log`, `git remote -v`) y la secuencia de comandos antes de autorizarlos. El Paso 1 lo commiteé yo.

[COMPLETAR: otros bloqueos reales, con el síntoma y cómo lo resolviste.]

---

## Decisiones sin asistencia de IA

Esta sección tiene dos partes. Solo la segunda cuenta como decisión propia.

### A. Decisiones informadas por IA que adopté y puedo defender
Estas decisiones venían en el plan de la IA o en el enunciado. Las adopté y las explico con mis palabras:

1. **404 en lugar de 403 para tareas ajenas.**
   - ¿Qué pasaría con 403? [COMPLETAR con tus palabras]
2. **Singleton de configuración con fail-fast.**
   - ¿Qué pasaría si no fallara al arrancar? [COMPLETAR con tus palabras]
3. **Filtrar siempre por `user_id` en el repositorio (`WHERE id = $1 AND user_id = $2`).**
   - ¿Qué pasaría si un GET por id olvidara filtrar por dueño? [COMPLETAR con tus palabras]
4. **PUT con semántica parcial (`minProperties: 1`).**
   - ¿Por qué parcial y no reemplazo total? [COMPLETAR con tus palabras]

### B. Decisiones propias (tomadas antes de consultar a la IA)
Pendientes de decidir y documentar. Escribe qué decidiste y por qué antes de preguntarle a la IA:

- Orden de `GET /tasks` (por ejemplo, por `created_at` descendente o por `fecha_vencimiento`): [COMPLETAR]
- ¿Se permite una `fecha_vencimiento` en el pasado?: [COMPLETAR]
- ¿`estado` es opcional al crear una tarea (por defecto `'pendiente'`)?: [COMPLETAR]
- Umbrales del rate limit en `/auth/*`: [COMPLETAR]
