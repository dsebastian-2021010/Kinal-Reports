const Fastify = require('fastify');
const teacherStatusRoutes = require('./modules/teacherStatus/teacherStatus.routes');
const swaggerConfig = require('./config/swagger');

const app = Fastify({
  logger: true
});

// Registrar Swagger
app.register(swaggerConfig);

// Registrar rutas
app.register(teacherStatusRoutes, { prefix: '/users' });


app.register(teacherStatusRoutes, { prefix: '/status' });

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });
});

module.exports = app;