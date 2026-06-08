import fs from 'fs';
import path from 'path';

const dirLogs = path.resolve('logs');

if (!fs.existsSync(dirLogs)) {
    fs.mkdirSync(dirLogs, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
    path.join(dirLogs, 'access.log'),
    { flags: 'a' }
);

const morganFormat = '[:date[iso]] :remote-addr :method :url :status :res[content-length] - :response-time ms';

const morganOptions = {
    stream: accessLogStream
};

export { accessLogStream, morganOptions, morganFormat };
