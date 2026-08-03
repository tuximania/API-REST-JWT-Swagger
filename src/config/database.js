import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Admin01@localhost:5432/restaurante',
});

export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT current_database() AS db, current_user AS user');
    console.log('Conexión a PostgreSQL OK:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error.message);
    return false;
  }
};

export const query = (text, params) => pool.query(text, params);

export default pool;
