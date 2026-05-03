const controller = require('./chat.controller');
const schemas = require('./chat.schema');
const roleMiddleware = require('../../middlewares/role.middleware');

async function routes(fastify) {

  fastify.post('/', {
    preHandler: roleMiddleware(['ALUMNO', 'PROFESOR', 'ADMINISTRADOR']),
    ...schemas.createChatSchema
  }, controller.createChat);

  fastify.get('/me', {
    preHandler: roleMiddleware(['ALUMNO', 'PROFESOR', 'ADMINISTRADOR']),
    ...schemas.getMyChatsSchema
  }, controller.getMyChats);

  fastify.post('/:id/message', {
    preHandler: roleMiddleware(['ALUMNO', 'PROFESOR', 'ADMINISTRADOR']),
    ...schemas.sendMessageSchema
  }, controller.sendMessage);
}

module.exports = routes;
