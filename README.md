# Clínica Médica - Backend (Trabajo Final Integrador)

- Requisitos de funcionamiento:
  - Node >= 16
  - MySQL

- Instalación:

```bash
npm install
cp .env.example .env   # completar variables de entorno
```

- Variables importantes (`.env`):
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
  - `PORT` (por defecto 3000)
  - `CORS_ORIGIN`


- Logging:
  - Se usa `morgan` para registrar solicitudes.
  - Logs de acceso se guardan en `logs/access.log`.

- Documentación API (Swagger):
  - Disponible en `http://localhost:3000/api-docs` cuando el servidor corre.

- Soft Delete (implementación):
  - Las tablas usan columna `activo` para marcar registros activos.
  - Las consultas de lectura deben filtrar `WHERE activo = 1`.
  - El borrado lógico es un `UPDATE` que setea `activo = 0`.

- Ejecutar servidor:

```bash
npm start
```

