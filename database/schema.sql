-- Esquema PostgreSQL para reservas de restaurante

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'rol_usuario') THEN
    CREATE TYPE rol_usuario AS ENUM ('cliente', 'admin');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estado_reservacion') THEN
    CREATE TYPE estado_reservacion AS ENUM ('pendiente', 'confirmada', 'cancelada', 'completada');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol rol_usuario NOT NULL DEFAULT 'cliente',
  creado_en TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mesas (
  id SERIAL PRIMARY KEY,
  numero INTEGER NOT NULL UNIQUE,
  capacidad INTEGER NOT NULL CHECK (capacidad > 0),
  ubicacion VARCHAR(100),
  activa BOOLEAN NOT NULL DEFAULT true,
  creado_en TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservaciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  mesa_id INTEGER NOT NULL REFERENCES mesas(id) ON DELETE RESTRICT,
  fecha DATE NOT NULL,
  hora TIME WITHOUT TIME ZONE NOT NULL,
  num_comensales INTEGER NOT NULL CHECK (num_comensales > 0),
  estado estado_reservacion NOT NULL DEFAULT 'pendiente',
  creado_en TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_mesa_fecha_hora_activa
  ON reservaciones (mesa_id, fecha, hora)
  WHERE estado <> 'cancelada';

INSERT INTO usuarios (nombre, email, password_hash, rol)
VALUES ('Administrador', 'admin@restaurante.com', '$2b$10$Q7f5i5zUFdM6oSd8bq4T5eR5Q1pGJQYw7mW0ePSqX5N3ulWfc5dWW', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO mesas (numero, capacidad, ubicacion, activa)
VALUES (1, 4, 'Salón principal', true),
       (2, 2, 'Terraza', true),
       (3, 6, 'Salón principal', true)
ON CONFLICT (numero) DO NOTHING;
