const Fastify = require('fastify');
const sectionsRoutes = require('./modules/sections/sections.routes');
const fastify = require('fastify')({ logger: true });
const swaggerConfig = require('./config/swagger');

fastify.register(swaggerConfig);

const app = Fastify({
  logger: true
});

app.register(sectionsRoutes, { prefix: '/sections' });

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message
  });
});

module.exports = app;