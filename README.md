# API de Gestión de Tareas (Task Manager API)

API REST modular y segura para la gestión de usuarios y tareas personales, desarrollada con **Node.js**, **Express 5**, **TypeScript**, **PostgreSQL** y documentada con **OpenAPI 3.0 / Swagger**.

---

## 🏗️ Arquitectura y Patrones de Diseño

El proyecto implementa una **Arquitectura en Capas (Layered Architecture)** con separación estricta de responsabilidades y bajo acoplamiento:

```
src/
├── api/
│   ├── middlewares/      # Interceptores: JWT auth, validación AJV, manejo de errores
│   └── routes/           # Definición de rutas y montaje de middlewares
├── controllers/          # Controladores HTTP: desempaquetan peticiones y envían respuestas
├── services/             # Capa de negocio: reglas de dominio, saneamiento y autorizaciones
├── persistence/          # Acceso a datos: consultas SQL nativas parametrizadas (sin ORM)
├── config/               # Singleton de configuración con validación fail-fast y Swagger
├── errors/               # Jerarquía de errores tipados (AppError)
├── schemas/              # Esquemas de validación de datos con AJV
└── types/                # Definiciones de tipos e interfaces TypeScript
```

### Principios y Patrones Aplicados:
- **Singleton Pattern**: La clase `Config` valida fail-fast las variables de entorno al inicializarse y previene lecturas repetidas de `process.env`.
- **Repository Pattern**: `TaskRepository` y `UserRepository` encapsulan todas las consultas SQL nativas parametrizadas (`$1, $2`), garantizando que la capa de servicio permanezca desacoplada del motor de base de datos.
- **Fail-Fast**: La aplicación aborta el arranque de inmediato si falta alguna variable de entorno requerida o si los valores son inválidos.
- **Prevención de IDOR (Insecure Direct Object References)**: El acceso a tareas siempre filtra por el usuario autenticado (`WHERE id = $1 AND user_id = $2`). Si un recurso pertenece a otro usuario, la API responde uniformemente con `404 Not Found` en lugar de `403 Forbidden`, impidiendo que atacantes deduzcan la existencia de tareas ajenas.
- **Protección contra Timing Attacks**: El login ejecuta una comparación dummy con `bcrypt` aun cuando el correo no existe, manteniendo el tiempo de respuesta uniforme para evitar la enumeración de usuarios.

---

## 📋 Requisitos Previos

- **Node.js**: v18.0.0 o superior (recomendado v20+)
- **PostgreSQL**: v14.0 o superior (o Docker / Docker Compose)
- **npm**: v9.0 o superior

---

## 🚀 Instalación y Puesta en Marcha

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
Crea tu archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de PostgreSQL:
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
```

Para las pruebas automatizadas, configura `.env.test`:
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
```

### 4. Inicializar la Base de Datos

**Opción A: PostgreSQL Local**
Conéctate a tu cliente PostgreSQL (`psql` o pgAdmin) y ejecuta:
```sql
CREATE DATABASE tasks_db;
CREATE DATABASE tasks_test_db;
```
Luego aplica el esquema en `tasks_db`:
```bash
psql -U postgres -d tasks_db -f src/persistence/schema.sql
```

**Opción B: Con Docker Compose**
```bash
docker compose up -d
```

### 5. Iniciar la aplicación

**Modo Desarrollo (con recarga automática):**
```bash
npm run dev
```

**Compilar a Producción:**
```bash
npm run build
npm start
```

La API estará disponible en `http://localhost:3000`.

---

## 📖 Documentación Interactiva (Swagger / OpenAPI)

La API cuenta con documentación interactiva completa OpenAPI 3.0:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Especificación OpenAPI en JSON**: [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

### Cómo autenticarse en Swagger UI:
1. Ejecuta el endpoint `POST /auth/login` con tus credenciales.
2. Copia el token retornado en `data.token`.
3. Haz clic en el botón verde **Authorize** (arriba a la derecha).
4. Pega el token y confirma. ¡Ahora puedes probar todos los endpoints protegidos directamente desde el navegador!

---

## 🧪 Pruebas Automatizadas

La suite de pruebas utiliza **Vitest** y **Supertest** con base de datos PostgreSQL real, aislamiento estricto y limpieza mediante `TRUNCATE` entre ejecuciones:

```bash
# Ejecutar todas las pruebas de integración
npm test

# Verificar tipos de TypeScript
npm run typecheck

# Compilar el proyecto
npm run build
```

---

## 💻 Ejemplos de Consumo con cURL

A continuación se muestra el ciclo de vida completo de consumo de la API:

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
Si otro usuario intenta consultar, actualizar o borrar la tarea `1`:
```bash
curl -X GET http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer <TOKEN_OTRO_USUARIO>"
```
*Respuesta de seguridad:*
```json
{
  "status": "error",
  "message": "Tarea no encontrada"
}
```
*(HTTP 404 Not Found: no revela la existencia del recurso a terceros).*

### 8. Eliminar una tarea
```bash
curl -X DELETE http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer <TOKEN_JWT>"
```

---

## 🔒 Consideraciones de Seguridad Implementadas

1. **Autenticación Robusta**: Tokens JWT firmados forzando algoritmo `HS256`, con verificación estricta de estructura y ciclo de expiración configurable.
2. **Hash Criptográfico con Salting**: Contraseñas procesadas con `bcrypt` (12 rondas por defecto).
3. **Defensa contra Timing Attacks**: Comparación dummy en login para evitar discrepancias de tiempo al autenticar correos inexistentes.
4. **Consultas 100% Parametrizadas**: Inmunidad contra inyecciones SQL mediante marcadores `$1, $2` del driver `pg`.
5. **Control de Acceso Basado en Propiedad (Ownership)**: Todas las operaciones de lectura y modificación están ligadas a `user_id` obtenido criptográficamente del token.
6. **Protección de Cabeceras HTTP**: Integración con `helmet` y limitación de tamaño del cuerpo de la petición (`10kb`) para mitigar denegación de servicio (DoS).
7. **Validación Estricta de Esquemas**: `ajv` con `additionalProperties: false` para bloquear la inyección de campos no autorizados (Mass Assignment).