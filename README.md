# API-REST-JWT-Swagger

## Descripción
API REST para un sistema de reservas de restaurante con autenticación JWT, roles de Cliente/Admin, PostgreSQL y documentación Swagger.

## Estado actual
La API ya incluye:
- registro e inicio de sesión con JWT
- protección de rutas mediante middleware
- manejo de mesas
- creación y consulta de reservaciones
- validación de capacidad de mesa
- documentación Swagger en `/api-docs`

## Estructura del proyecto
- `src/`
  - `app.js` — configuración principal de Express.
  - `server.js` — arranque del servidor.
  - `routes/` — rutas de `auth`, `mesas` y `reservaciones`.
  - `controllers/` — lógica real de autenticación, mesas y reservaciones.
  - `middlewares/` — validación JWT y control de roles.
  - `swagger.js` — configuración de Swagger UI.
- `database/schema.sql` — esquema y seed inicial para PostgreSQL.
- `.env.example` — variables de entorno de ejemplo.
- `.gitignore` — exclusiones del repositorio.

## Requisitos
- Node.js 18+
- PostgreSQL con una base llamada `restaurante`

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuximania/API-REST-JWT-Swagger.git
   cd API-REST-JWT-Swagger
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea el archivo de entorno:
   ```bash
   copy .env.example .env
   ```
4. Ajusta `.env` si necesitas otra URL de conexión o puerto.
5. Crea la base de datos y aplica el esquema:
   ```bash
   psql -h localhost -U postgres -d restaurante -f database/schema.sql
   ```

## Ejecución
- Desarrollo:
  ```bash
  npm run dev
  ```
- Producción:
  ```bash
  npm start
  ```

## Endpoints principales
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/perfil`
- `GET /api/mesas`
- `GET /api/mesas/:id`
- `POST /api/mesas` (Admin)
- `PUT /api/mesas/:id` (Admin)
- `DELETE /api/mesas/:id` (Admin)
- `POST /api/reservaciones`
- `GET /api/reservaciones/mis`
- `GET /api/reservaciones` (Admin)
- `PUT /api/reservaciones/:id/estado` (Admin)
- `DELETE /api/reservaciones/:id`

## Documentación Swagger
La documentación interactiva queda disponible en:

```text
http://localhost:4000/api-docs
```

## Notas
- El archivo del skill se mantiene local y no se sube al repositorio.
- El proyecto está preparado para seguir agregando más validaciones y una capa de base de datos más completa.
