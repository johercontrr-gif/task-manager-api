# Bitácora de Desarrollo

**Proyecto:** API de Gestión de Tareas (Node.js + Express 5 + TypeScript + PostgreSQL).  
**Formato por entrada:** Herramienta · Commit · Prompt (literal) · Acepté · Cambié/rechacé · Verifiqué.  
**Herramientas de IA usadas:**  
- **Antigravity:** Asistente técnico principal para diseño de arquitectura, generación incremental de código y ejecución de comandos Git supervisados.  
- **Claude:** Asistente de revisión externa y contraste crítico para desafiar el plan de ejecución, auditar la veracidad técnica de la bitácora y exigir pruebas rigurosas.

---

## Tabla Resumen de Commits de Pasos Funcionales y Cronología Real

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
| **Audit 1** | `c525018` | 2026-10-09 11:48:03 -05:00 | johercontrr-gif (vía Antigravity) | `docs: update readme and development log with security audit` |
| **Audit 2** | `3806913` | 2026-10-09 14:13:04 -05:00 | johercontrr-gif (vía Antigravity) | `fix(auth): adjust password validation to min 8 and max 72 for bcrypt limit` |
| **Audit 3** | `5db1fd5` | 2026-10-09 14:13:17 -05:00 | johercontrr-gif (vía Antigravity) | `feat(rate-limit): add limiter factory and test 429 json response format` |
| **Audit 4** | `fc01a95` | 2026-10-09 14:13:33 -05:00 | johercontrr-gif (vía Antigravity) | `refactor(db): clarify DATE parser timezone comment and declare node engines` |
| **Audit 5** | `33cdc92` | 2026-10-09 14:14:16 -05:00 | johercontrr-gif (vía Antigravity) | `docs: update readme with verified node version, complete env variables, and test db setup` |
| **Audit 6** | `d9feb36` | 2026-10-09 17:13:00 -05:00 | johercontrr-gif (vía Antigravity) | `docs: improve readme with endpoint table, conventions, windows commands and docker details` |
| **16** | `c687ca3` | 2026-10-09 17:41:15 -05:00 | johercontrr-gif (vía Antigravity) | `feat: add render deployment configuration and cloud database support` |

> **Aclaración sobre cronología, ritmo y estructura de commits:**  
> 1. **Estructura de commits en el repositorio:**  
>    Cada paso funcional se implementó mediante un par de commits: un commit de código (`feat:`, `chore:`, `test:`) seguido inmediatamente de un commit de documentación de la bitácora (`docs: document paso X in development log`). Esto, junto con el commit inicial de GitHub y los commits atómicos de auditoría, explica por qué la tabla resume los pasos principales mientras el historial real de Git registra el desglose completo.
> 2. **Ritmo de trabajo y ejecución concentrada:**  
>    Los Pasos 7 a 10 se integraron en 14 minutos (22:43 a 22:57 del 8 de octubre) y los Pasos 11 a 14 en 27 minutos (10:37 a 11:04 del 9 de octubre). Estas franjas corresponden a dos sesiones de ejecución intensiva y continua donde la lógica, los esquemas AJV y las consultas SQL ya habían sido diseñados y revisados conceptualmente en el plan estructurado del Paso 0. Cada commit fue probado (`npm run typecheck`, pruebas manuales y suite de tests) antes de su confirmación. Cada resultado en la sección "Verifiqué" es reproducible y defendible en vivo.
> 3. **Falta de atomicidad en el Paso 15:**  
>    En el commit `dc6d9d0` (Paso 15) se mezclaron rate limiting, CSP, una prueba de integración, README y bitácora. Reconozco que este commit no fue estrictamente atómico en comparación con los pasos previos. Para subsanar esta desviación, las mejoras de auditoría posteriores (`3806913`, `5db1fd5`, `fc01a95`, `33cdc92`, `d9feb36`) se desglosaron en commits pequeños, modulares y atómicos.

---

## Rol y Prompts Literales hacia Claude (Auditoría Externa y Contraste Crítico)

Claude fue utilizado como un auditor senior externo y crítico técnico del proceso, encargado de encontrar inconsistencias, sesgos del código generado por Antigravity y discrepancias en la documentación.

### Prompts literales formulados a Claude:

1. **Prompt de tono y enfoque:**  
   `"genera una bitacora que no suene tanto a IA"`  
   *Aporte de Claude:* Recomendó evitar lenguaje hiperbólico o condescendiente, exigiendo un formato formal de ingeniería: *Herramienta · Commit · Prompt · Acepté · Cambié/rechacé · Verifiqué*.

2. **Prompt de delimitación del alcance pedagógico:**  
   `"Te voy a pasar un proyecto el cual tengo que realizar pero necesito que no lo hagas tan experto , algo simple que se pueda documentar y entender de manera sencilla... son 3 dias no 4. Entiendelo revisalo y respondeme si unicamente."`  
   *Aporte de Claude:* Fijó las restricciones fundamentales de partida: Express 5 sin librerías innecesarias de errores, driver `pg` con SQL parametrizado puro sin ORM, y rechazo de sobreingeniería.

3. **Prompt de auditoría de veracidad y rigor probatorio:**  
   `"Bitacora 4. Calidad de las entradas: 'Cambié/rechacé: Nada' en 10 de 14 pasos da la impresión de que no revisaste... Varias verificaciones son descripciones, no evidencia. Paso 4: 'inicialización del Pool' no verifica nada. ¿Corriste docker compose up y consultaste las tablas? Pasos 5, 6, 7, 9 y 10: pon el comando y la respuesta obtenida... Paso 12: contentSecurityPolicy: false desactiva la CSP en toda la API, no solo en Swagger... Rate limit: impleméntalo o bórralo del log... Commits: compara git log con tus encabezados... Restaura la tabla de resumen por día con fechas y hashes."`  
   *Aporte de Claude:* Desencadenó la implementación del rate limiting, el endurecimiento de CSP, el reemplazo de descripciones vagas por salidas verificables de consola y la reconstrucción honesta de la cronología real.

4. **Prompt de auditoría de precisión técnica:**  
   `"4. Defecto técnico en el Paso 6. Dice password mín 6, máx 100. Lo acordado era mínimo 8 y un máximo pensado para bcrypt: lo que pase de 72 bytes se trunca silenciosamente. Además dice que refleja 'columnas', pero la columna guarda el hash, no la contraseña... 5. La explicación del DATE en el Paso 4 es incorrecta. pg crea el Date en medianoche local, no UTC. El desfase aparece al este de UTC... 6. README y bitácora se contradicen (created_at en login, variables de rate limit en README, test db)... 7. Ritmo y atomicidad... 8. El rate limit se prueba a medias: falta ver respuesta 429 real... 9. Menores: CSP en REST, papel de Claude subreportado..."`  
   *Aporte de Claude:* Condujo a corregir el esquema de contraseña a 8-72 caracteres, rectificar la física de la zona horaria de DATE, añadir la prueba de integración del código HTTP 429 con mensaje JSON homogéneo y sincronizar al 100% el README y la bitácora.

5. **Prompt de auditoría de reproducibilidad, coherencia y rigor en documentación:**  
   `"revisa esto si o no Lo que me devolvió GitHub es idéntico al README que vi antes, incluida la petición cacheada. Si ya subiste correcciones, ábrelo en una ventana privada para confirmar que están en main; tal como lo veo, ninguno de los puntos que te señalé se refleja todavía. Cubre las cuatro cosas que pide el enunciado... pero tiene fallos de reproducibilidad y de coherencia. Puede hacer fallar a un evaluador... Comandos solo para bash... Base de datos de pruebas... Docker... Sobre-promesas... Lo que falta y suma puntos: Tabla de endpoints... Modelo de datos y convenciones... Diagrama de capas... Clona el repo en una carpeta nueva y sigue solo el README..."`  
   *Aporte de Claude:* Condujo a incorporar comandos nativos de Windows (PowerShell/CMD), advertencia sobre cURL en PowerShell recomendando Swagger UI, detalles operacionales de Docker (recreación de volúmenes con docker compose down -v y creación de tasks_test_db), lenguaje técnico sin sobre-promesas, tabla resumen de endpoints de consulta rápida en 20 segundos, modelo de datos y convenciones de respuesta homogénea.

---

## Bloque 1: Base, Configuración y Persistencia

### Paso 0 · Plan de ejecución (uso de IA, sin commit)
**Herramienta:** Antigravity (plan). Revisión externa: Claude.  
**Prompt:** "Crea un plan de trabajo de 15 pasos divididos en 3 días para construir la API. Cada paso debe ser fácil de registrar en un commit individual y debe seguir al pie de la letra la estructura y los estados que pide el ejercicio."  
*Contexto:* Se suministró el enunciado completo con sus restricciones técnicas (Node.js, Express, TypeScript, PostgreSQL sin ORM) y se solicitó un desglose modular fácil de versionar y defender.  
**Acepté:** Plan modular de 15 pasos con la regla de 1 commit por paso y documentación inmediata para asegurar trazabilidad.  
**Cambié/rechacé:** Un borrador inicial de la IA proponía el estado `en_progreso` aduciendo que el enunciado no especificaba los valores de estado. Detecté el error al contrastar la propuesta con la Sección 3 del enunciado, señalando que el requisito oficial exige `'en curso'` (con espacio). Se fijaron `'pendiente'`, `'en curso'` y `'completada'`.  
**Verifiqué:** Relectura minuciosa de la Sección 3 del enunciado, comprobando que cada requisito funcional y de seguridad tuviera su paso asignado en el plan.

---

### Paso 1 · chore: initialize project with typescript and express
**Herramienta:** Antigravity.  
**Commit:** `89edd9d` (ejecutado manualmente en consola local)  
**Prompt:** "Inicia el proyecto usando TypeScript y Express. Por favor, separa el archivo de configuración (app.ts) del que arranca el servidor (server.ts) para que sea más fácil hacer pruebas después. También ajusta la configuración de TypeScript en modo estricto."  
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
**Prompt:** "Vamos con el Paso 2: arma la estructura de carpetas del proyecto (routes, controllers, services, etc.). Pon un archivo .gitkeep en cada una para que Git nos deje guardar las carpetas aunque estén vacías por ahora."  
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
**Prompt:** "Ahora conectemos el proyecto con GitHub. Borra el archivo del plan temporal, une el historial de cambios local con el de la nube de forma limpia (con rebase) y sube todo a la rama principal."  
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
**Prompt:** "Crea un archivo de configuración centralizado que lea las variables de entorno. Haz que la aplicación avise y se detenga inmediatamente si falta algún dato importante para funcionar, y asegúrate de que lea el archivo .env.test cuando estemos haciendo pruebas."  
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
**Prompt:** "Configura la conexión a la base de datos PostgreSQL de forma directa (sin ORM). Prepara el archivo SQL con las tablas de usuarios y tareas, asegurándote de que los estados sean exactamente los pedidos y que al borrar un usuario se borren sus tareas. Arma también el archivo de Docker."  
**Acepté:** Driver nativo `pg` (sin ORM) para consultas SQL parametrizadas explícitas. Esquema `schema.sql` con tablas `users` y `tasks`, clave foránea con `ON DELETE CASCADE`, índice `idx_tasks_user_id` y restricción `CHECK (estado IN ('pendiente', 'en curso', 'completada'))`. Parser de tipo `types.builtins.DATE` (`v => v`) para retornar la cadena literal `YYYY-MM-DD` tal como reside en PostgreSQL.  
**Cambié/rechacé:** Se evaluó utilizar un ORM (Prisma/TypeORM); se rechazó tajantemente para satisfacer la directiva técnica de SQL nativo sin capas opacas. Se rechazó el parser estándar de `pg` para columnas `DATE` porque por defecto instancia un objeto `Date` de JavaScript en medianoche local (00:00:00 local). Al serializarlo a formato ISO/UTC o consumirlo en clientes situados al este de UTC, esa conversión temporal puede desplazar la fecha de calendario. Además, el valor devuelto por defecto era un objeto `Date`, mientras que el contrato de la API exige una cadena de texto pura `'YYYY-MM-DD'`; por ello, se fijó `types.setTypeParser(types.builtins.DATE, v => v)` retornando directamente la cadena sin transformaciones ni desajustes temporales.  
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
**Prompt:** "Prepara el sistema central para manejar los errores de la aplicación. Crea clases para los distintos tipos de error (como 'No encontrado' o 'Error de validación') para que todas las respuestas de error tengan el mismo formato. Aprovecha para agregar Helmet y mejorar la seguridad básica."  
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
**Prompt:** "Crea el sistema que va a validar los datos que envían los usuarios usando AJV. Define reglas estrictas para el registro y el login: no debe aceptar campos extra que no hayamos pedido y debe validar que los formatos (como el correo) sean correctos."  
**Acepté:** Integración de `ajv` y `ajv-formats` mediante middleware de orden superior `validate(schema)`. Esquemas fuertemente tipados con `JSONSchemaType<T>` para `RegisterDTO` y `LoginDTO`. En `users`, las columnas corresponden a `nombre VARCHAR(100)` y `email VARCHAR(255)`. Para la contraseña enviada en el body, se fijaron límites de `minLength: 8` y `maxLength: 72`, protegiendo la API contra contraseñas triviales y reconociendo el límite útil de `bcrypt`.  
**Cambié/rechacé:** Se evaluó habilitar `removeAdditional: true` en AJV; se rechazó en favor de `additionalProperties: false` para que la API responda con `400 Bad Request` ante campos no autorizados o erratas en nombres de propiedades en lugar de descartarlos silenciosamente (prevención de Mass Assignment).  
*Corrección técnica sobre la contraseña:* Se rechazó la propuesta inicial de validar `password` con un rango de 6 a 100 caracteres aduciendo que reflejaba "columnas de la BD". En primer lugar, la columna de PostgreSQL es `password_hash VARCHAR(255)` y almacena exclusivamente el hash generado, no la contraseña en plano. En segundo lugar, se corrigió el mínimo a 8 caracteres por política de seguridad y el máximo a 72 caracteres, ya que la especificación de bcrypt trunca silenciosamente las contraseñas a partir de los 72 bytes; permitir más de 72 crearía una falsa ilusión de longitud que la función de hash ignoraría.  
**Verifiqué:**  
- Validación con payload sin email:  
  `validate(registerSchema)({ nombre: "Juan", password: "secretPassword" })`  
  → interceptado con `HTTP 400 ValidationError`: `field: 'email'`, `message: "must have required property 'email'"`.
- Validación con campos no declarados:  
  `validate(registerSchema)({ nombre: "Juan", email: "j@j.com", password: "secret", rol: "admin" })`  
  → interceptado con `HTTP 400 ValidationError`: `field: 'rol'`, `message: "must NOT have additional properties"`.
- Validación de límites de contraseña:  
  - Contraseña menor a 8 caracteres (`"1234567"`): interceptado con `HTTP 400 ValidationError` (`minLength`).
  - Contraseña mayor a 72 caracteres (`"a".repeat(73)`): interceptado con `HTTP 400 ValidationError` (`maxLength`).

---

### Paso 7 · feat: add user registration endpoint
**Herramienta:** Antigravity.  
**Commit:** `316aba1`  
**Prompt:** "Haz la funcionalidad para registrar usuarios. Asegúrate de encriptar la contraseña antes de guardarla, maneja el error si alguien intenta usar un correo que ya existe, y cuida que al devolver los datos del usuario recién creado no se incluya su contraseña."  
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
**Prompt:** "Arma la funcionalidad de inicio de sesión. Al validar los datos, genera un token JWT. También incluye una protección para que el sistema tarde lo mismo en responder tanto si el usuario existe como si no, evitando así que adivinen cuentas."  
**Acepté:** Endpoint `POST /auth/login` con validación de credenciales, generación de token JWT con algoritmo `HS256`, payload tipado `{ userId, email }` y tiempo de expiración configurable.  
**Cambié/rechacé:** Se evaluó devolver mensajes de error diferenciados para "usuario no encontrado" y "contraseña errónea"; se rechazó tajantemente para impedir la enumeración de usuarios. Se implementó una comparación criptográfica dummy (`bcrypt.compare(password, DUMMY_HASH)`) cuando el usuario no existe para neutralizar ataques basados en discrepancias de tiempo de respuesta (timing attacks).  
**Verifiqué:**  
- Login con credenciales válidas:  
  `curl -i -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"carlos@test.com","password":"PasswordSegura123"}'`  
  → `HTTP/1.1 200 OK`  
  `{"status":"success","data":{"token":"eyJhbGciOiJIUzI1NiIsIn...","user":{"id":1,"nombre":"Carlos Gomez","email":"carlos@test.com","created_at":"2026-10-08T22:43:13.000Z"}}}`
- Prueba de timing attack con medición de tiempo:
  - Intento con contraseña incorrecta: `HTTP 401 Credenciales invalidas` en **~235 ms**.
  - Intento con usuario inexistente: `HTTP 401 Credenciales invalidas` en **~234 ms** (tiempo idéntico gracias al hash dummy precalculado).

---

### Paso 9 · feat: add jwt authentication middleware
**Herramienta:** Antigravity.  
**Commit:** `7d8a121`  
**Prompt:** "Crea el filtro de seguridad que va a revisar los tokens JWT en las rutas protegidas. Debe leer el token, verificar que sea totalmente válido, y si todo está bien, guardar el ID del usuario en la petición para saber quién está haciendo la consulta."  
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
**Prompt:** "Haz las funciones para crear y ver tareas. Valida los datos que lleguen, ponle el estado 'pendiente' por defecto a las nuevas tareas y asegúrate muy bien de que cada usuario solo pueda ver sus propias tareas."  
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
**Prompt:** "Termina el resto de las operaciones de tareas (ver una sola, editarla y borrarla). Valida que el ID enviado sea correcto, permite editar solo algunos campos si es necesario, y si alguien intenta tocar una tarea de otro usuario, responde como si la tarea no existiera (error 404) por seguridad."  
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
**Prompt:** "Agrega la documentación visual usando Swagger. Configura todo para que se puedan probar las rutas con el token desde ahí mismo, documenta todas las rutas que hemos hecho y ajusta un poco la seguridad de Helmet para que no bloquee la vista de la documentación."  
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
**Prompt:** "Crea las pruebas automáticas con Vitest y Supertest. Configura una base de datos real exclusiva para las pruebas, que se limpie por completo antes de cada test. Haz que las pruebas se ejecuten una por una para que no choquen entre ellas."  
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
**Prompt:** "Escribe la documentación final del proyecto en el archivo README. Explica cómo está armado, cómo configurarlo, las medidas de seguridad que tomamos y pon ejemplos de uso. También termina de organizar el documento de bitácora contando los retos que resolvimos."  
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
**Prompt:** "Ajustemos los últimos detalles de seguridad y documentación: agrega un límite de peticiones (rate limit) configurable, ajusta la seguridad de Helmet para que solo relaje las reglas en la ruta de Swagger, y dale una última revisada a la bitácora y al README para que todo coincida perfectamente con lo que hicimos."  
**Acepté:**  
- Implementación de `express-rate-limit` con `authRateLimiter` y factory `createAuthRateLimiter` en `src/api/middlewares/rate-limit.middleware.ts` protegiendo `/auth/*` (15 min ventana, máx 10 peticiones en producción/dev, 1000 en test).
- Variables de entorno en `Config` (`RATE_LIMIT_WINDOW_MS` y `RATE_LIMIT_MAX_REQUESTS`), actualizando `.env.example` y `.env.test.example`.
- Refactorización de seguridad en `src/app.ts`: Helmet aplica CSP estricto globalmente en todos los endpoints de la API, y un middleware interceptor remueve `Content-Security-Policy` exclusivamente en peticiones hacia `/api-docs` para permitir Swagger UI interactivo sin relajar la protección del resto del sistema.
- Adición de pruebas de integración en `tests/integration/auth.test.ts` validando tanto las cabeceras `ratelimit-limit` y `ratelimit-remaining` como la respuesta `HTTP 429 Too Many Requests` ante excesos de peticiones.
- Auditoría técnica completa y sincronización de `README.md` y `DEVELOPMENT_LOG.md`.  
**Cambié/rechacé:**  
- Se rechazó mantener el CSP desactivado globalmente; se implementó el aislamiento granular estricto por ruta.
- Se rechazaron valores fijos (hardcodeados) de rate limit, canalizando la configuración a través de la clase `Config`.  
- *Nota sobre atomicidad:* En el commit `dc6d9d0` se agruparon simultáneamente rate limiting, CSP, una prueba de integración, README y bitácora, perdiéndose la estricta atomicidad observada en los pasos previos. Las mejoras de auditoría posteriores (`3806913`, `5db1fd5`, `fc01a95`, `33cdc92`) se desglosaron en commits modulares y atómicos para corregir esta desviación.
**Verifiqué:**  
- `npm run typecheck` → `0` errores de compilación TypeScript.
- `npm run build` → compilación exitosa a `dist/`.
- `npm test` → 22/22 pruebas aprobadas al 100%:
  ```
   RUN  v5.0.3 C:/Users/USUARIO/Documents/Proyecto tecnicoo

   ✓ tests/integration/tasks.test.ts (14 tests) 868ms
   ✓ tests/integration/auth.test.ts (8 tests) 647ms

   Test Files  2 passed (2)
        Tests  22 passed (22)
     Duration  3.00s
  ```
- Verificación de bloqueo 429 por rate limit:
  Petición 3 excediendo límite (con `max: 2`) → `HTTP/1.1 429 Too Many Requests`, cabecera `ratelimit-remaining: 0` y cuerpo:
  ```json
  {
    "status": "error",
    "message": "Demasiadas solicitudes desde esta direccion IP, por favor intente nuevamente mas tarde"
  }
  ```
- Verificación de cabeceras CSP:  
  `GET /health` → cabecera `Content-Security-Policy` activa.  
  `GET /api-docs/` → cabecera `Content-Security-Policy` removida selectivamente.
- `git ls-files | grep .env` → únicamente `.env.example` y `.env.test.example` versionados; ningún secreto real expuesto.

---

## Bloque 4: Despliegue en la Nube y DevOps

### Paso 16 · feat: add render deployment configuration and cloud database support
**Herramienta:** Antigravity.  
**Commit:** `c687ca3`  
**Prompt:** "Vamos a agregar un nuevo paso para preparar el despliegue del proyecto en Render. Crea la configuración necesaria (como un archivo render.yaml) para levantar tanto nuestra API como la base de datos PostgreSQL en la nube. Asegúrate de dejar listos los scripts en el package.json para compilar el código TypeScript y arrancar la aplicación en producción, y explícame qué variables de entorno vamos a necesitar configurar en la plataforma."  
**Acepté:**
- Archivo `render.yaml` (Infrastructure as Code - Blueprint) que provisiona automáticamente el servicio web Node.js y la base de datos PostgreSQL administrada en la capa gratuita.
- Script idempotente `src/persistence/init-db.ts` y comando npm `"db:init": "node dist/persistence/init-db.js"` para ejecutar el esquema `schema.sql` durante la fase de compilación en Render (`buildCommand: npm install && npm run build && node dist/persistence/init-db.js`).
- Extensión de la clase `Config` y de `getPool()` en `src/persistence/db.ts` para soportar opcionalmente cadenas `DATABASE_URL` y conexión cifrada SSL condicional (`DB_SSL=true`, `ssl: { rejectUnauthorized: false }`) requeridas por bases de datos PostgreSQL en la nube.
- Adición de scripts `db:init` y `db:init:dev` en `package.json` conservando los comandos de compilación (`tsc`) y ejecución (`node dist/server.js`).
- Documentación de variables en `.env.example`.
**Cambié/rechacé:**
- Se rechazó exigir obligatoriamente `DATABASE_URL`, manteniendo soporte intacto para variables atómicas (`DB_HOST`, `DB_PORT`, etc.) para no quebrar el desarrollo local con Docker Compose ni las pruebas en Vitest.
- Se rechazó forzar SSL incondicionalmente; se condicionó a `process.env.DB_SSL === "true"` para permitir conexiones locales sin certificados.
- Se rechazó escribir credenciales o secretos en `render.yaml`; se configuró `fromDatabase` para conectar la base de datos de manera transparente y `generateValue: true` para que Render genere un `JWT_SECRET` criptográfico de longitud adecuada automáticamente.
**Verifiqué:**
- `npm run typecheck` → compilación estricta de TypeScript con `0` errores.
- `npm run build` → transpilación exitosa a `dist/` incluyendo `dist/persistence/init-db.js`.
- `npm run db:init` → ejecución en consola:
  ```text
  [db:init] Aplicando esquema DDL desde: src/persistence/schema.sql
  [db:init] Tablas e índices creados / verificados satisfactoriamente.
  [db:init] Proceso de inicialización finalizado con éxito.
  ```
- `npm test` → 22 pruebas de integración pasando exitosamente (auth + tasks).
- `git status` y verificación de `render.yaml`.

---

## Retos y soluciones

1. **Comportamiento de tipos en PostgreSQL y DATE parser**:  
   *Síntoma:* El driver `pg` parsea por defecto las columnas `DATE` como un objeto `Date` de JavaScript en medianoche local (00:00:00 local). Si ese objeto se convierte a ISO/UTC o se consume en clientes con husos horarios situados al este de UTC, la conversión puede provocar desplazamientos indeseados de un día en el calendario. Además, devolvía una instancia de objeto `Date` en vez de una cadena, rompiendo la coherencia del contrato de la API.  
   *Solución:* Se registró un parser específico con `types.setTypeParser(types.builtins.DATE, v => v)` que omite la instanciación de objetos `Date` y devuelve directamente la cadena literal `'YYYY-MM-DD'` tal como reside en PostgreSQL.
2. **Rutas con barras invertidas en Windows para Swagger-JSDoc**:  
   *Síntoma:* Al ejecutar en Windows o compilar a `dist/`, `path.join` generaba barras invertidas `\` que rompían el motor `glob` de `swagger-jsdoc`, resultando en un documento OpenAPI vacío sin rutas.  
   *Solución:* Se normalizaron todas las rutas glob con `.replace(/\\/g, "/")` y se configuró coincidencia para archivos `.ts` y `.js`, asegurando funcionamiento transparente tanto en desarrollo (`src`) como en producción transpilada (`dist`).
3. **Trade-off de Content Security Policy (CSP) en Helmet con Swagger UI**:  
   *Síntoma:* La directiva CSP predeterminada de Helmet bloqueaba los scripts y estilos inline del visor de Swagger UI en `/api-docs`. Se evaluó deshabilitar CSP globalmente (`contentSecurityPolicy: false`), pero aunque en endpoints REST que devuelven JSON el impacto de CSP es prácticamente nulo (los navegadores no ejecutan scripts al parsear JSON), su verdadero valor reside en proteger contra inyecciones XSS en interfaces HTML navegables.  
   *Solución:* En lugar de deshabilitar CSP en toda la aplicación, se configuró Helmet de manera granular: CSP estricto se mantiene como política global y un middleware específico remueve la cabecera únicamente en peticiones hacia `/api-docs` para permitir la renderización interactiva de Swagger UI.
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

*(Redacción y contraste conceptual de esta subsección apoyados por Claude)*

1. **404 en lugar de 403 para tareas ajenas (mitigación combinada de IDOR y enumeración de recursos).**  
   *¿Qué pasaría con 403?* Un código `403 Forbidden` confirmaría al cliente que la tarea con ese ID sí existe en la base de datos, aunque pertenezca a otra persona. Si un atacante manipula el parámetro `:id` (vector de ataque de IDOR), un código 403 le permitiría llevar a cabo un ataque de enumeración, deduciendo qué IDs existen realmente en el sistema. Al devolver uniformemente `404 Not Found` ("Tarea no encontrada"), la respuesta es indistinguible entre una tarea inexistente y una tarea ajena, protegiendo tanto contra el acceso no autorizado como contra la fuga de metadatos de existencia.
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

