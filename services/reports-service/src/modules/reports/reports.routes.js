const controller = require('./reports.controller');
const schemas = require('./reports.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.createReportSchema
  }, controller.createReport);

  fastify.get('/', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.getReportsSchema
  }, controller.getReports);

  fastify.get('/:id', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.getReportSchema
  }, controller.getReport);

  fastify.delete('/:id', {
    preHandler: roleMiddleware(['ADMINISTRADOR']),
    ...schemas.deleteReportSchema
  }, controller.deleteReport);
}

module.exports = routes;
