const controller = require('./sections.controller');
const schemas = require('./sections.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

fastify.post(
  '/',
  {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    schema: schemas.createSectionSchema
  },
  controller.createSection
);

fastify.get('/', controller.getSections);

fastify.get('/:id', controller.getSection);

fastify.delete(
  '/:id',
  {
    preHandler: roleMiddleware(['ADMINISTRADOR'])
  },
  controller.deleteSection
);

}


module.exports = routes;