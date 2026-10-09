# API de Gestión de Tareas (Task Manager API)

API REST modular y segura para la gestión de usuarios y tareas personales, desarrollada con **Node.js**, **Express 5**, **TypeScript**, **PostgreSQL** y documentada con **OpenAPI 3.0 / Swagger**.

Para consultar la trazabilidad del desarrollo, decisiones arquitectónicas y la bitácora paso a paso, revisa el archivo [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md).

---

## Arquitectura y Patrones de Diseño

El proyecto implementa una **Arquitectura en Capas (Layered Architecture)** con separación estricta de responsabilidades y bajo acoplamiento:

```
src/
├── api/
│   ├── middlewares/      # Interceptores: JWT auth, validación AJV, rate limit, manejo de errores
│   └── routes/           # Definición de rutas y montaje de middlewares
├── controllers/          # Controladores HTTP: desempaquetan peticiones y envían respuestas
├── services/             # Capa de negocio: reglas de dominio, saneamiento y autorizaciones
├── persistence/          # Acceso a datos: consultas SQL nativas parametrizadas (sin ORM)
├── config/               # Singleton de configuración con validación fail-fast y Swagger
├── errors/               # Jerarquía de errores tipados (AppError)
├── schemas/              # Esquemas de validación de datos con AJV
└── types/                # Definiciones de tipos e interfaces TypeScript
```

### Flujo de Ejecución por Petición:
```text
Cliente HTTP → Routes → Middlewares (Auth JWT, AJV) → Controllers → Services → Repositories → PostgreSQL
                                                                        ↓ (excepciones)
                                                             Global Error Handler (AppError)
```

### Principios y Patrones Aplicados:
- **Singleton Pattern**: La clase `Config` valida en modo fail-fast las variables de entorno al inicializarse y previene lecturas repetidas de `process.env`.
- **Repository Pattern**: `TaskRepository` y `UserRepository` encapsulan todas las consultas SQL nativas parametrizadas (`$1, $2`), garantizando que la capa de servicio permanezca desacoplada del motor de base de datos.
- **Fail-Fast**: La aplicación aborta el arranque de inmediato si falta alguna variable de entorno requerida o si contiene valores inválidos.
- **Mitigación de IDOR (Insecure Direct Object References)**: El acceso a tareas siempre filtra por el usuario autenticado (`WHERE id = $1 AND user_id = $2`). Si un recurso pertenece a otro usuario, la API responde con `404 Not Found` en lugar de `403 Forbidden`, impidiendo que terceros deduzcan la existencia o identificadores de tareas ajenas.
- **Mitigación de Timing Attacks en Login**: Cuando un correo no existe, el servicio ejecuta una comparación contra un hash precalculado de coste idéntico (`DUMMY_HASH`), reduciendo significativamente la variación en los tiempos de respuesta.
- **Actualización Parcial Idempotente (PUT)**: El endpoint `PUT /tasks/:id` admite actualización parcial de campos sin requerir reenvío del recurso completo, aplicando una lista blanca estricta para la construcción dinámica de columnas.

---

## Tabla Resumen de Endpoints

| Método | Ruta | Autenticación | Código Éxito | Códigos de Error | Descripción |
|---|---|:---:|:---:|:---:|---|
| `POST` | `/auth/register` | No | `201 Created` | `400, 409, 429` | Registro de nuevo usuario |
| `POST` | `/auth/login` | No | `200 OK` | `400, 401, 429` | Autenticación y generación de JWT |
| `POST` | `/tasks` | Sí (Bearer) | `201 Created` | `400, 401` | Creación de una tarea |
| `GET` | `/tasks` | Sí (Bearer) | `200 OK` | `401` | Listado de tareas del usuario autenticado |
| `GET` | `/tasks/:id` | Sí (Bearer) | `200 OK` | `400, 401, 404` | Obtención de tarea por identificador |
| `PUT` | `/tasks/:id` | Sí (Bearer) | `200 OK` | `400, 401, 404` | Actualización parcial de una tarea |
| `DELETE` | `/tasks/:id` | Sí (Bearer) | `204 No Content` | `400, 401, 404` | Eliminación de una tarea |
| `GET` | `/health` | No | `200 OK` | — | Verificación de estado del servidor |
| `GET` | `/api-docs` | No | `200 OK` | — | Documentación interactiva Swagger UI |

---

## Modelo de Datos y Convenciones

1. **Estados de una Tarea**:
   - `'pendiente'` (valor asignado por defecto al crear)
   - `'en curso'`
   - `'completada'`
2. **Formato de Fechas**:
   - Formato estricto `YYYY-MM-DD` (tipo `DATE` en PostgreSQL). El driver de conexión incluye un parser personalizado para evitar desfases producidos por conversiones a medianoche local en diferentes husos horarios.
3. **Propiedad y Seguridad del Usuario (`user_id`)**:
   - El `user_id` **nunca** se recibe en el cuerpo (`body`) ni como parámetro en las rutas de tareas. Se extrae exclusivamente del token JWT validado por el middleware de autenticación.
4. **Estructura Estándar de Respuestas JSON**:
   - **Éxito:**
     ```json
     {
       "status": "success",
       "data": { ... }
     }
     ```
   - **Error:**
     ```json
     {
       "status": "error",
       "message": "Descripción legible del error",
       "details": [ ... ]
     }
     ```

---

## Requisitos Previos

- **Node.js**: Probado y verificado en **v24.14.1** (requiere `v20.0.0` o superior, según `engines` en `package.json`)
- **PostgreSQL**: v14.0 o superior (o Docker / Docker Compose)
- **npm**: v9.0 o superior

---

## Instalación y Puesta en Marcha

### 1. Clonar el repositorio
```bash
git clone https://github.com/johercontrr-gif/task-manager-api.git
cd task-manager-api
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

**En Linux / macOS / Git Bash:**
```bash
cp .env.example .env
cp .env.test.example .env.test
```

**En Windows (PowerShell / CMD):**
```powershell
copy .env.example .env
copy .env.test.example .env.test
```

#### Variables para Entorno de Desarrollo (`.env`):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgres
DB_NAME=tasks_db
JWT_SECRET=tu_clave_secreta_de_al_menos_32_caracteres_aleatorios
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

#### Variables para Pruebas Automatizadas (`.env.test`):
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgres
DB_NAME=tasks_test_db
JWT_SECRET=secreto_solo_para_pruebas_de_al_menos_32_caracteres
JWT_EXPIRES_IN=1h
BCRYPT_SALT_ROUNDS=4
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
```

---

### 4. Inicializar la Base de Datos

#### Opción A: Con Docker Compose (Recomendada)
El archivo `docker-compose.yml` inicia un contenedor `tasks_postgres` con PostgreSQL 16 Alpine en el puerto `5432`.

1. Inicia el contenedor:
   ```bash
   docker compose up -d
   ```
   > **Nota sobre el esquema en Docker:** El archivo `src/persistence/schema.sql` montado en `/docker-entrypoint-initdb.d/` se ejecuta **únicamente la primera vez** que se inicializa el volumen `pgdata`. Si necesitas reconstruir la base de datos desde cero, ejecuta:
   > ```bash
   > docker compose down -v
   > docker compose up -d
   > ```
   > Asegúrate de que `DB_USER` y `DB_PASSWORD` en tu archivo `.env` coincidan con las credenciales del compose (`postgres` / `postgres` por defecto).

2. Crear la base de datos para pruebas (`tasks_test_db`):
   Docker Compose solo crea la base de datos principal (`tasks_db`). Para inicializar la base de pruebas requerida por `npm test`, ejecuta:
   ```bash
   docker compose exec postgres psql -U postgres -c "CREATE DATABASE tasks_test_db;"
   ```
   *(El esquema de tablas en `tasks_test_db` se aplica de forma automática al ejecutar `npm test` mediante el helper de pruebas `initializeTestDb()`)*.

#### Opción B: PostgreSQL Local
Conéctate a tu cliente PostgreSQL (`psql` o pgAdmin) y crea ambas bases de datos:
```sql
CREATE DATABASE tasks_db;
CREATE DATABASE tasks_test_db;
```
Aplica el esquema inicial a `tasks_db`:
```bash
psql -U postgres -d tasks_db -f src/persistence/schema.sql
```

---

### 5. Iniciar la Aplicación

**Modo Desarrollo (con recarga automática mediante `tsx`):**
```bash
npm run dev
```

**Compilar y Ejecutar en Producción:**
```bash
npm run build
npm start
```

El servidor estará escuchando en `http://localhost:3000`.

---

## Documentación Interactiva (Swagger / OpenAPI)

La API cuenta con documentación interactiva completa basada en OpenAPI 3.0:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Especificación OpenAPI en JSON**: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

### Cómo autenticarse en Swagger UI:
1. Ejecuta el endpoint `POST /auth/login` con credenciales registradas.
2. Copia el token retornado en `data.token`.
3. Haz clic en el botón verde **Authorize** (arriba a la derecha).
4. Pega el token y confirma. Los endpoints protegidos podrán consumirse directamente desde el navegador.

---

## Pruebas Automatizadas

La suite de pruebas utiliza **Vitest** y **Supertest** contra la base de datos PostgreSQL real (`tasks_test_db`), garantizando aislamiento estricto y limpieza mediante `TRUNCATE` entre pruebas:

```bash
# Ejecutar todas las pruebas de integración
npm test

# Verificar análisis estático de tipos TypeScript
npm run typecheck

# Validar la compilación del proyecto
npm run build
```

---

## Ejemplos de Consumo con cURL

> **Nota para entornos Windows / PowerShell:**  
> Los siguientes ejemplos utilizan la sintaxis estándar de Bash (con saltos de línea con `\`). En PowerShell, `curl` suele ser un alias de `Invoke-WebRequest` y el carácter de escape es `` ` `` en lugar de `\`. Para interactuar con la API en Windows se recomienda usar **Git Bash**, Postman o interactuar directamente a través de **Swagger UI** en `http://localhost:3000/api-docs`.

### 1. Registrar un usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Maria",
    "email": "ana@example.com",
    "password": "PasswordSegura123"
  }'
```

### 2. Iniciar sesión y obtener token JWT
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ana@example.com",
    "password": "PasswordSegura123"
  }'
```
*Respuesta:*
```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "nombre": "Ana Maria",
      "email": "ana@example.com",
      "created_at": "2026-10-09T10:00:00.000Z"
    }
  }
}
```

### 3. Crear una nueva tarea
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -d '{
    "titulo": "Preparar informe trimestral",
    "descripcion": "Consolidar métricas del tercer trimestre",
    "fecha_vencimiento": "2026-10-31",
    "estado": "pendiente"
  }'
```

### 4. Listar las tareas del usuario
```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer <TOKEN_JWT>"
```

### 5. Obtener una tarea por ID
```bash
curl -X GET http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer <TOKEN_JWT>"
```

### 6. Actualizar parcialmente una tarea (PUT parcial)
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -d '{
    "estado": "en curso"
  }'
```

### 7. Demostración de Mitigación de IDOR (Acceso a Tarea Ajena)
Si otro usuario autenticado intenta consultar, modificar o eliminar la tarea `1`:
```bash
curl -X GET http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer <TOKEN_OTRO_USUARIO>"
```
*Respuesta:*
```json
{
  "status": "error",
  "message": "Tarea no encontrada"
}
```
*(HTTP `404 Not Found`: responde igual que si el ID no existiera, evitando filtrar información sobre la existencia de recursos ajenos).*

### 8. Eliminar una tarea
```bash
curl -X DELETE http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer <TOKEN_JWT>"
```

---

## Consideraciones de Seguridad Implementadas

1. **Consultas SQL Parametrizadas**: Todas las consultas a la base de datos utilizan parámetros vinculados (`$1, $2`) provistos por el driver nativo `pg`. En la actualización dinámica de tareas, los nombres de columnas se filtran estrictamente contra una lista blanca permitida.
2. **Control de Propiedad (Ownership)**: Todas las operaciones de consulta, actualización y eliminación de tareas restringen el acceso mediante el `user_id` extraído del token JWT verificado por el middleware.
3. **Autenticación con JWT**: Tokens firmados forzando el algoritmo simétrico `HS256`, con verificación de cabecera `Authorization: Bearer <token>` y tiempo de expiración configurable.
4. **Almacenamiento Seguro de Contraseñas**: Contraseñas procesadas con `bcrypt` (12 rondas de salt por defecto). La validación exige entre 8 y 72 caracteres (límite efectivo de procesamiento del algoritmo bcrypt).
5. **Mitigación de Timing Attacks**: En caso de correo no registrado en `/auth/login`, se realiza una comparación dummy contra `DUMMY_HASH`, reduciendo la variación en los tiempos de respuesta.
6. **Validación de Esquemas con AJV**: Validación estricta con `additionalProperties: false` para bloquear la inyección de atributos no autorizados (Mass Assignment).
7. **Cabeceras HTTP y Límites de Payload**: Configuración de cabeceras mediante `helmet` (con CSP estricto en los endpoints de datos y adaptado para la documentación interactiva Swagger UI) y límite del cuerpo de peticiones (`10kb`) en el parser JSON.
8. **Limitación de Tasa (Rate Limiting)**: Control en memoria del proceso con `express-rate-limit` para las rutas `/auth/*` (por defecto 10 solicitudes por ventana de 15 minutos en desarrollo/producción).

---

## Despliegue en la Nube (Render)

El proyecto incluye configuración de **Infrastructure as Code** lista para desplegar en [Render](https://render.com) mediante el archivo `render.yaml`.

### Despliegue con Render Blueprint (Automático)
1. Inicia sesión en [render.com](https://render.com).
2. Ve a **Blueprints** $\rightarrow$ **New Blueprint Instance**.
3. Conecta el repositorio `johercontrr-gif/task-manager-api`.
4. Render detectará `render.yaml` y aprovisionará de forma coordinada:
   - La base de datos PostgreSQL gestionada (`task-manager-db`).
   - El servicio web Node.js (`task-manager-api`).
   - El enlace de credenciales `DATABASE_URL` y la generación automática de un `JWT_SECRET` aleatorio seguro.
   - La compilación del código TypeScript (`npm run build`) y la inicialización de tablas e índices (`node dist/persistence/init-db.js`).
5. Haz clic en **Apply**.

> **Nota sobre la capa gratuita de Render:** Los servicios gratuitos entran en estado de reposo tras 15 minutos de inactividad, por lo que la primera petición puede tardar entre 30 y 50 segundos mientras la instancia se reactiva.