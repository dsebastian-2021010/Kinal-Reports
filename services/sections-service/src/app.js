const Fastify = require('fastify');
const cors = require('@fastify/cors');
const sectionsRoutes = require('./modules/sections/sections.routes');
const swaggerConfig = require('./config/swagger');

const app = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' }
    }
  }
});

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-role', 'x-user-id']
});

app.register(swaggerConfig);
app.register(sectionsRoutes, { prefix: '/sections' });

app.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.status(error.statusCode || 500).send({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });
});

module.exports = app;
