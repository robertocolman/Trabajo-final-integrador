# Clinica Medica - Backend

Trabajo Final Integrador de Programacion III (UNER).
API REST para gestion de clinica medica con Express + MySQL.

## Datos de entrega

- Materia: Programacion III
- Carrera: Tecnicatura Universitaria en Desarrollo Web
- Grupo: Grupo W
- Integrantes: 
## Roberto Esteban Chávez 
## Roberto Albano Colman 
## Raúl Fabricio Fabian Galindez
## Nicolas Montenegro
## Leandro Plaza Puga
## Nahuel Valenzuela

- Video de exposicion: COMPLETAR URL

## Stack tecnologico

- Node.js
- Express
- MySQL (mysql2)
- Swagger (swagger-jsdoc + swagger-ui-express)
- express-validator
- CORS
- Morgan (logging)
- dotenv

## Requisitos de funcionamiento

- Node >= 16
- MySQL

## Instalacion y ejecucion

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```bash
cp .env.example .env
```

3. Ejecutar servidor:

```bash
npm start
```

4. Base URL local:

Acceso a Swagger :

http://localhost:3000/api-docs/

```text
http://localhost:3000/api/v1
```

## Variables de entorno

Este proyecto requiere un archivo `.env` con valores de entorno para conexion y configuracion.

Variables esperadas:

- `PORT`: puerto del servidor (por defecto 3000)
- `NODE_ENV`: entorno (`development` o `production`)
- `CORS_ORIGIN`: origen permitido para CORS
- Variables de MySQL: host, puerto, usuario, password, base de datos (segun `.env.example`)

## Base de datos

La persistencia se realiza en MySQL.

Pasos recomendados:

1. Crear la base de datos.
2. Ejecutar el script de esquema (tablas y relaciones).
3. Cargar datos iniciales si corresponde.
4. Verificar conexion desde la API.

Nota: completar aqui el nombre exacto de scripts SQL y el orden de ejecucion utilizado por el grupo.

## Funcionalidades por rol

### Medico

- Iniciar sesion.
- Listar turnos propios.
- Marcar turno como atendido.

### Paciente

- Iniciar sesion.
- Crear reservas de turnos propios.
- Listar turnos propios.
- Listar especialidades.
- Listar medicos (general y por especialidad).

### Administrador

- Iniciar sesion.
- Listar/crear/editar especialidades.
- Asociar medicos con especialidades.
- Listar/crear/editar obras sociales.
- Asociar medicos con obras sociales.
- Asociar pacientes con obras sociales.
- Registrar turno para paciente, medico y fecha.
- Obtener estadisticas de atenciones.

## Endpoints disponibles en este backend

- `/api/v1/especialidades`
- `/api/v1/medicos`
- `/api/v1/pacientes`
- `/api/v1/usuarios`
- `/api/v1/obras_sociales`

Ver detalle completo (request/response, codigos y esquemas) en Swagger.

## Documentacion API (Swagger)

Disponible en:

```text
http://localhost:3000/api-docs
```

## Validaciones, middlewares y logging

- Validaciones de entrada con `express-validator`.
- CORS configurable por variable de entorno (`CORS_ORIGIN`).
- Logging de solicitudes con `morgan`.
- Middleware de log adicional para payload de `POST`/`PUT`.
- Logs de acceso en `logs/access.log`.

## Manejo de errores y respuestas HTTP

La API utiliza respuestas estandarizadas para exito y error.

Codigos comunes:

- `200`: operacion exitosa
- `201`: recurso creado
- `400`: validacion o datos invalidos
- `404`: recurso no encontrado
- `409`: conflicto (registro duplicado)
- `500`: error interno del servidor

## Regla de negocio: soft delete

No se realiza borrado fisico de registros. Se usa borrado logico mediante el campo `activo`.

- En `especialidades`, `obras_sociales` y `usuarios`: se aplica `UPDATE ... SET activo = 0`.
- En `medicos` y `pacientes` (segun esquema): se desactiva el usuario relacionado (`usuarios.activo = 0`).
- Las consultas de lectura filtran por `activo = 1` (directa o relacionalmente).

## Usuarios de prueba

## Medico:



  `email": "benhor@correo.com`
  `contrasenia": "benhor`


## Admin:



  `email": "ferben@correo.com`
  `contraseña": "ferben`



## Paciente:



  `email": "lopjac@correo.com`
  `contrasenia": "lopjac`


