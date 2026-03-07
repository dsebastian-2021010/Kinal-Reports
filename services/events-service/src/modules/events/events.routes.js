const controller = require('./events.controller');
const schemas = require('./events.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post(
    '/',
    {
      preHandler: roleMiddleware(['ADMINISTRADOR']),
      schema: schemas.createEventSchema
    },
    controller.createEvent
  );

  fastify.get('/', controller.getEvents);

  fastify.get('/:id', controller.getEvent);

  fastify.delete(
    '/:id',
    {
      preHandler: roleMiddleware(['ADMINISTRADOR'])
    },
    controller.deleteEvent
  );
}

module.exports = routes;