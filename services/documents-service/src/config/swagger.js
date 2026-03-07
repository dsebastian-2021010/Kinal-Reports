async function swaggerConfig(fastify) {
  await fastify.register(require('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'Documentación del microservicio',
        version: '1.0.0'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    exposeRoute: true
  });
}

module.exports = swaggerConfig;