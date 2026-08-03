# API-REST-JWT-Swagger

## Descripción
Proyecto inicial para una API REST de reservas de restaurante con autenticación JWT, roles (Cliente/Admin) y documentación Swagger.

## Estructura del proyecto
- `src/`
  - `app.js` — configuración principal de Express.
  - `server.js` — arranque del servidor.
  - `routes/` — rutas de `auth`, `mesas` y `reservaciones`.
  - `controllers/` — controladores con la lógica de negocio inicial.
  - `middlewares/` — middleware de autenticación y control de roles.
  - `swagger.js` — configuración de Swagger UI.
- `database/schema.sql` — esquema inicial de la base de datos.
- `.env.example` — variables de entorno de ejemplo.
- `.gitignore` — exclusiones del repositorio.

## Requisitos
- Node.js 18+ instalado.
- PostgreSQL u otra base de datos compatible para crear el esquema.

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
   cp .env.example .env
   ```
4. Ajusta los valores en `.env` según tu base de datos y configuración.
5. Crea la base de datos y ejecuta `database/schema.sql`.

## Uso
- Ejecutar en modo desarrollo:
  ```bash
  npm run dev
  ```
- Ejecutar en modo producción:
  ```bash
  npm start
  ```

## Endpoints básicos
- `POST /api/auth/register` — registrar usuario cliente.
- `POST /api/auth/login` — iniciar sesión y obtener JWT.
- `GET /api/auth/perfil` — obtener datos del usuario autenticado.
- `GET /api/mesas` — listar mesas.
- `GET /api/mesas/:id` — detalle de mesa.
- `POST /api/mesas` — crear mesa (Admin).
- `PUT /api/mesas/:id` — actualizar mesa (Admin).
- `DELETE /api/mesas/:id` — desactivar mesa (Admin).
- `POST /api/reservaciones` — crear reservación.
- `GET /api/reservaciones/mis` — reservaraciones del usuario.
- `GET /api/reservaciones` — listar todas las reservaciones (Admin).
- `PUT /api/reservaciones/:id/estado` — cambiar estado (Admin).
- `DELETE /api/reservaciones/:id` — cancelar reservación.

## Documentación Swagger
Después de iniciar el servidor, la documentación estará disponible en:

```
http://localhost:4000/api-docs
```

## Notas
- El archivo `API REST con JWT y Swagger.skill.md` se ignora y no debe subirse al repositorio.
- Este proyecto es una plantilla inicial; los controladores deben completarse con la lógica real de base de datos y validación.
