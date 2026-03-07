const swagger = require('@fastify/swagger');
const swaggerUI = require('@fastify/swagger-ui');

async function swaggerConfig(fastify, options) {

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Kinal Reports API',
        description: 'Documentación de microservicios',
        version: '1.0.0'
      }
    }
  });

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    exposeRoute: true
  });

}

module.exports = swaggerConfig;