const controller = require('./documents.controller');
const schemas = require('./documents.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ALUMNO']),
    ...schemas.createDocumentSchema
  }, controller.createDocument);

  fastify.get('/', {
    preHandler: roleMiddleware(['ALUMNO', 'PROFESOR', 'ADMINISTRADOR']),
    ...schemas.getDocumentsSchema
  }, controller.getDocuments);

  fastify.get('/:id', {
    preHandler: roleMiddleware(['ALUMNO', 'PROFESOR', 'ADMINISTRADOR']),
    ...schemas.getDocumentSchema
  }, controller.getDocument);

  fastify.patch('/:id/approve', {
    preHandler: roleMiddleware(['ADMINISTRADOR', 'PROFESOR']),
    ...schemas.approveDocumentSchema
  }, controller.approveDocument);
}

module.exports = routes;
