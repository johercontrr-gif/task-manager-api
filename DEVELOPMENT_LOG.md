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
