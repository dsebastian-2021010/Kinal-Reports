const controller = require('./schedule.controller');
const schemas = require('./schedule.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

  fastify.post(
  '/',
  {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    schema: schemas.createScheduleSchema
  },
  controller.createSchedule
);

fastify.get('/', controller.getSchedules);

fastify.get('/:id', controller.getSchedule);

fastify.delete(
  '/:id',
  {
    preHandler: roleMiddleware(['ADMINISTRADOR'])
  },
  controller.deleteSchedule
);

}


module.exports = routes;