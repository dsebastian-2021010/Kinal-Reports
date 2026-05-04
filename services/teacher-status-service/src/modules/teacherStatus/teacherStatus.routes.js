const controller = require('./teacherStatus.controller');
const schemas = require('./teacherStatus.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

  fastify.patch('/me', {
    preHandler: roleMiddleware(['PROFESOR']),
    ...schemas.updateStatusSchema
  }, controller.updateStatus);

  fastify.get('/:teacherId', {
    ...schemas.getStatusSchema
  }, controller.getStatus);

  fastify.get('/', {
    ...schemas.getAllStatusSchema
  }, controller.getAll);
}

module.exports = routes;
