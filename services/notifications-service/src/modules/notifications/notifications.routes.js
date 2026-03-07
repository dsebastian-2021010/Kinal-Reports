const controller = require('./notifications.controller');
const schemas = require('./notifications.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify, options) {

  fastify.post(
    '/',
    {
      preHandler: roleMiddleware(['ADMINISTRADOR']),
      schema: schemas.createNotificationSchema
    },
    controller.createNotification
  );

  fastify.get(
    '/me',
    {
      preHandler: roleMiddleware(['ALUMNO','PROFESOR','ADMINISTRADOR'])
    },
    controller.getMyNotifications
  );

  fastify.patch(
    '/:id/read',
    {
      preHandler: roleMiddleware(['ALUMNO','PROFESOR','ADMINISTRADOR'])
    },
    controller.markAsRead
  );
}

module.exports = routes;