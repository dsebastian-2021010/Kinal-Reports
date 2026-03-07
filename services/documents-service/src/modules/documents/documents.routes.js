const controller = require('./documents.controller');
const schemas = require('./documents.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post(
    '/',
    {
      preHandler: roleMiddleware(['ALUMNO']),
      schema: schemas.createDocumentSchema
    },
    controller.createDocument
  );

  fastify.patch(
    '/:id/approve',
    {
      preHandler: roleMiddleware(['ADMINISTRADOR','PROFESOR']),
      schema: schemas.approveDocumentSchema
    },
    controller.approveDocument
  );

}

module.exports = routes;