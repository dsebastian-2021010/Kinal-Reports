const controller = require('./teacherStatus.controller');
const schemas = require('./teacherStatus.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

fastify.patch(
  '/me',
  {
    preHandler: roleMiddleware(['PROFESOR'])
  },
  controller.updateStatus
);

fastify.get('/:teacherId', controller.getStatus);

fastify.get('/', controller.getAll);

}


module.exports = routes;