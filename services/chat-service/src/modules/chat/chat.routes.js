const controller = require('./chat.controller');
const schemas = require('./chat.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

  fastify.post(
    '/',
    {
      preHandler: roleMiddleware(['ALUMNO','PROFESOR','ADMINISTRADOR']),
      schema: schemas.createChatSchema
    },
    controller.createChat
  );

  fastify.get(
    '/me',
    {
      preHandler: roleMiddleware(['ALUMNO','PROFESOR','ADMINISTRADOR'])
    },
    controller.getMyChats
  );

  fastify.post(
    '/:id/message',
    {
      preHandler: roleMiddleware(['ALUMNO','PROFESOR','ADMINISTRADOR']),
      schema: schemas.sendMessageSchema
    },
    controller.sendMessage
  );
}

module.exports = routes;