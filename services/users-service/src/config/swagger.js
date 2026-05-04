const fp = require('fastify-plugin');
const swagger = require('@fastify/swagger');
const swaggerUI = require('@fastify/swagger-ui');

async function swaggerConfig(fastify) {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'Servicio de Usuarios',
        description: 'Documentación de la API para la gestión completa de usuarios en el sistema.',
        version: '1.0.0',
        contact: {
          name: 'Equipo de Desarrollo Kinal Reports',
          email: 'dsebastian-2021010@kinal.edu.gt'
        }
      },
      servers: [
        { url: 'http://localhost:3000', description: 'Desarrollo local' }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [{ bearerAuth: [] }]
    },
    exposeRoute: true
  });

  await fastify.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
      displayRequestDuration: true,
      filter: true
    },
    staticCSP: true,
    transformStaticCSP: header => header
  });
}

module.exports = fp(swaggerConfig);