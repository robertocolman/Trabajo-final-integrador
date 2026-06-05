import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorResponse } from './src/utils/responseHandler.js';
import especialidadRoutes from './src/routes/especialidadRoutes.js';
import { morganOptions, morganFormat } from './src/config/logger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.js';
import requestLogger from './src/middleware/requestLogger.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan(morganFormat, morganOptions));
}

// Registrar bodies cortos de POST/PUT para debugging local
app.use(requestLogger);

app.use('/api/v1/especialidades', especialidadRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
    errorResponse(res, 'Ruta no encontrada', 404);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    errorResponse(res, 'Error interno del servidor', 500);
});

const PORT = process.env.PORT || 3000;

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