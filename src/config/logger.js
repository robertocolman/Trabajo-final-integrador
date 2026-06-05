import fs from 'fs';
import path from 'path';

// Creado por Leandro - ajuste de nombres para estilo estudiantil
const dirLogs = path.resolve('logs');

if (!fs.existsSync(dirLogs)) {
    fs.mkdirSync(dirLogs, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
    path.join(dirLogs, 'access.log'),
    { flags: 'a' }
);

// Formato simple y claro para los logs
const morganFormat = '[:date[iso]] :remote-addr :method :url :status :res[content-length] - :response-time ms';

const morganOptions = {
    stream: accessLogStream
};

export { accessLogStream, morganOptions, morganFormat };
