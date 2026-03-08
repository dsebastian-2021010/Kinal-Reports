const service = require('./chat.service');

const createChat = async (request, reply) => {

  const chat = await service.createChat(request.body.participants);

  reply.code(201).send({
    message: 'Chat created',
    data: chat
  });
};

const getMyChats = async (request, reply) => {

  const userId = request.headers['x-user-id'];

  const chats = await service.getMyChats(userId);

  reply.send({
    total: chats.length,
    data: chats
  });
};

const sendMessage = async (request, reply) => {

  const userId = request.headers['x-user-id'];

  const chat = await service.sendMessage(
    request.params.id,
    userId,
    request.body.content
  );

  reply.send({
    message: 'Message sent',
    data: chat
  });
};

module.exports = {
  createChat,
  getMyChats,
  sendMessage
};