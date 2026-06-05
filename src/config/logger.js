import fs from 'fs';
import path from 'path';

const logsDir = path.resolve('logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
    path.join(logsDir, 'access.log'),
    { flags: 'a' }
);

const morganOptions = {
    stream: accessLogStream
};

export { accessLogStream, morganOptions };
