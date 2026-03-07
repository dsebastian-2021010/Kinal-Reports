const Fastify = require('fastify');
const eventsRoutes = require('./modules/events/events.routes');
const fastify = require('fastify')({ logger: true });
const swaggerConfig = require('./config/swagger');

fastify.register(swaggerConfig);

const app = Fastify({ logger: true });

app.register(eventsRoutes, { prefix: '/events' });

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message
  });
});

module.exports = app;