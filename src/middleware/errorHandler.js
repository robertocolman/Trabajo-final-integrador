import { errorResponse } from '../utils/responseHandler.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err?.code === 'ER_DUP_ENTRY') {
        const match = err?.sqlMessage?.match(/for key '([^']+)'/);
        const keyName = match?.[1] || 'campo unico';
        return errorResponse(res, `Registro duplicado en ${keyName}`, 409);
    }

    if (err?.code === 'ER_NO_REFERENCED_ROW_2') {
        return errorResponse(res, 'Referencia invalida en datos relacionados', 400);
    }

    errorResponse(res, err.message || 'Error interno del servidor', err.statusCode || 500);
};
