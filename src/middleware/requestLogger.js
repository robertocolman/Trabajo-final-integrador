export default function requestLogger(req, res, next) {
    if ((req.method === 'POST' || req.method === 'PUT') && req.body && Object.keys(req.body).length > 0) {
        try {
            const cuerpo = JSON.stringify(req.body);
            if (cuerpo.length < 1000) {
                console.log(`Body ${req.method} ${req.originalUrl}:`, cuerpo);
            } else {
                console.log(`Body ${req.method} ${req.originalUrl}: [payload grande]`);
            }
        } catch {
        }
    }
    next();
}
