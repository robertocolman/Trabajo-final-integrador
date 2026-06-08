import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorResponse } from './src/utils/responseHandler.js';
import especialidadRoutes from './src/routes/especialidadRoutes.js';
import medicoRoutes from './src/routes/medicoRoutes.js';
import pacienteRoutes from './src/routes/pacienteRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import obraSocialRoutes from './src/routes/obrasocialRoutes.js';
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
    
    app.use(morgan(morganFormat, morganOptions));
} else {
    
    app.use(morgan(morganFormat, morganOptions));
}


app.use(requestLogger);

app.use('/api/v1/especialidades', especialidadRoutes);
app.use('/api/v1/medicos', medicoRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/obras_sociales', obraSocialRoutes);

// Documentación Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            defaultModelRendering: 'model'
        },
        customCss: `
            .swagger-ui .model-example,
            .swagger-ui .response-col_description .renderedMarkdown,
            .swagger-ui .examples-select,
            .swagger-ui .opblock-section-request-body .tab li:first-child,
            .swagger-ui .responses-inner .tab li:first-child {
                display: none !important;
            }
        `
    })
);

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