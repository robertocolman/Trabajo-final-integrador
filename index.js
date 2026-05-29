import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorResponse } from './src/utils/responseHandler.js';
import especialidadRoutes from './src/routes/especialidadRoutes.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/especialidades', especialidadRoutes);

app.use((req, res) => {
    errorResponse(res, 'Ruta no encontrada', 404);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    errorResponse(res, 'Error interno del servidor', 500);
});

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`
    ========================================
    ✓ Servidor iniciado correctamente
    ✓ Puerto: ${PORT}
    ✓ Entorno: ${NODE_ENV}
    ✓ URL: http://localhost:${PORT}/api/v1
    ========================================
    `);
});