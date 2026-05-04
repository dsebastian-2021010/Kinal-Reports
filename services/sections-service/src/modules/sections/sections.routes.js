const controller = require('./sections.controller');
const schemas = require('./sections.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.createSectionSchema
  }, controller.createSection);

  fastify.get('/', {
    ...schemas.getSectionsSchema
  }, controller.getSections);

  fastify.get('/:id', {
    ...schemas.getSectionSchema
  }, controller.getSection);

  fastify.delete('/:id', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.deleteSectionSchema
  }, controller.deleteSection);
}

module.exports = routes;
