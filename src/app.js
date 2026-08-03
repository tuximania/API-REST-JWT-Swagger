import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import mesaRoutes from './routes/mesas.js';
import reservacionRoutes from './routes/reservaciones.js';
import swaggerSetup from './swagger.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mesas', mesaRoutes);
app.use('/api/reservaciones', reservacionRoutes);

swaggerSetup(app);

app.get('/', (req, res) => {
  res.json({ message: 'API REST con JWT y Swagger' });
});

export default app;
