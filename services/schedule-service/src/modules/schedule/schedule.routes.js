const controller = require('./schedule.controller');
const schemas = require('./schedule.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.createScheduleSchema
  }, controller.createSchedule);

  fastify.get('/', {
    ...schemas.getSchedulesSchema
  }, controller.getSchedules);

  fastify.get('/:id', {
    ...schemas.getScheduleSchema
  }, controller.getSchedule);

  fastify.delete('/:id', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.deleteScheduleSchema
  }, controller.deleteSchedule);
}

module.exports = routes;
