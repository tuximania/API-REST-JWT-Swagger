import app from './app.js';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const connected = await testConnection();
  if (!connected) {
    console.error('No se pudo conectar a PostgreSQL. Revisa DATABASE_URL y las credenciales.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
