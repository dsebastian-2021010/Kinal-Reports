const Fastify = require('fastify');
const documentsRoutes = require('./modules/documents/documents.routes');
const fastify = require('fastify')({ logger: true });
const swaggerConfig = require('./config/swagger');

fastify.register(swaggerConfig);

const app = Fastify({
  logger: true
});

// Registro de rutas
app.register(documentsRoutes, {
  prefix: '/documents'
});

// Manejador global de errores
app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });
});

module.exports = app;