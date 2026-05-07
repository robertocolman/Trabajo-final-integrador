require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { errorResponse } = require('./src/utils/responseHandler');
const especialidadRoutes = require('./src/routes/especialidadRoutes');

const app = express();

app.use(cors());
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
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}/api/v1/especialidades`);
});