const Fastify = require('fastify');
const usersRoutes = require('./modules/users/users.routes');
const swaggerConfig = require('./config/swagger');

const app = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
});



// Registrar Swagger
app.register(swaggerConfig);

// Registrar rutas
app.register(usersRoutes, { prefix: '/users' });

// Manejo de errores
app.setErrorHandler((error, request, reply) => {
  request.log.error({
    message: error.message,
    stack: error.stack
  });

  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });

  
});

module.exports = app;