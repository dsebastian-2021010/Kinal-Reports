const Fastify = require('fastify');
const notificationsRoutes = require('./modules/notifications/notifications.routes');
const fastify = require('fastify')({ logger: true });
const swaggerConfig = require('./config/swagger');

fastify.register(swaggerConfig);

const app = Fastify({ logger: true });

app.register(notificationsRoutes, { prefix: '/notifications' });

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message
  });
});

module.exports = app;