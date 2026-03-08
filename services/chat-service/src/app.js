const Fastify = require('fastify');
const chatRoutes = require('./modules/chat/chat.routes');
const fastify = require('fastify')({ logger: true });
const swaggerConfig = require('./config/swagger');

fastify.register(swaggerConfig);

const app = Fastify({ logger: true });

app.register(chatRoutes, { prefix: '/chat' });

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message
  });
});

module.exports = app;