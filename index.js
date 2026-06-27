import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { errorResponse } from './src/utils/responseHandler.js';
import { errorHandler } from './src/middleware/errorHandler.js';

import especialidadRoutes from './src/routes/especialidadRoutes.js';
import medicoRoutes from './src/routes/medicoRoutes.js';
import pacienteRoutes from './src/routes/pacienteRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
import obraSocialRoutes from './src/routes/obrasocialRoutes.js';
import turnoRoutes from './src/routes/turnoRoutes.js';
import reporteRoutes from './src/routes/reporteRoutes.js';

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
app.use(express.urlencoded({ extended: true }));

const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(morgan(morganFormat, morganOptions));
} else {
    app.use(morgan(morganFormat, morganOptions));
}

app.use(requestLogger);

// API
app.use('/api/v1/especialidades', especialidadRoutes);
app.use('/api/v1/medicos', medicoRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/obras_sociales', obraSocialRoutes);
app.use('/api/v1/turnos', turnoRoutes);

// REPORTES PDF
app.use('/api/reportes', reporteRoutes);
app.use('/api/v1/reportes', reporteRoutes);

// Swagger
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
                customJs: '/swagger-custom.js',
        swaggerOptions: {
            defaultModelRendering: 'model'
        }
    })
);

app.get('/swagger-custom.js', (req, res) => {
        res.type('application/javascript');
        res.send(`
(() => {
    const replaceDownloadLabel = () => {
        const elements = document.querySelectorAll('button, a');
        elements.forEach((el) => {
            if (el.textContent && el.textContent.trim() === 'Download file') {
                el.textContent = 'Descargar reporte';
            }
        });
    };

    replaceDownloadLabel();

    const observer = new MutationObserver(() => {
        replaceDownloadLabel();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
`);
});

app.use((req, res) => {
    errorResponse(res, 'Ruta no encontrada', 404);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
========================================
✓ Servidor iniciado correctamente
✓ Puerto: ${PORT}
✓ Entorno: ${NODE_ENV}
✓ API: http://localhost:${PORT}/api/v1
✓ PDF: http://localhost:${PORT}/api/reportes/turnos/pdf
========================================
`);
});