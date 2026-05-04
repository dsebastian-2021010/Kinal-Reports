const controller = require('./events.controller');
const schemas = require('./events.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.createEventSchema
  }, controller.createEvent);

  fastify.get('/', {
    ...schemas.getEventsSchema
  }, controller.getEvents);

  fastify.get('/:id', {
    ...schemas.getEventSchema
  }, controller.getEvent);

  fastify.delete('/:id', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.deleteEventSchema
  }, controller.deleteEvent);
}

module.exports = routes;
