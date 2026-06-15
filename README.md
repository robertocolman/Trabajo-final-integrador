# Clínica Médica 

- Requisitos de funcionamiento:
  - Node >= 16
  - MySQL

- Instalación:

```bash
npm install
cp .env.example .env   # completar variables de entorno
```


- Logging:
  - Se usa `morgan` para registrar solicitudes.
  - Logs de acceso se guardan en `logs/access.log`.



- Documentación API (Swagger):
  - Disponible en `http://localhost:3000/api-docs` cuando el servidor corre.

- Usuarios de prueba:


Medico:
  "email": "benhor@correo.com",
  "contrasenia": "benhor"
Admin:
  "email": "ferben@correo.com",
  "contrasenia": "ferben"
Paciente
  "email": "lopjac@correo.com",
  "contrasenia": "lopjac"



- Soft Delete (implementación):
  - Se aplica borrado lógico sin eliminar físicamente registros.
  - En `especialidades`, `obras_sociales` y `usuarios`: `UPDATE ... SET activo = 0`.
  - En `medicos` y `pacientes` (según el esquema oficial): la desactivación se refleja en `usuarios.activo = 0` del usuario relacionado.
  - Las consultas de lectura filtran por estado activo según la relación correspondiente.

- Ejecutar servidor:

```bash
npm start
```

