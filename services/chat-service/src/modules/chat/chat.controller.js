const service = require('./chat.service');

const createChat = async (request, reply) => {
  try {
    const chat = await service.createChat(request.body.participants);
    reply.code(201).send({ message: 'Chat created', data: chat });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getMyChats = async (request, reply) => {
  try {
    const userId = request.headers['x-user-id'];
    const chats = await service.getMyChats(userId);
    reply.send({ total: chats.length, data: chats });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const sendMessage = async (request, reply) => {
  try {
    const userId = request.headers['x-user-id'];
    const chat = await service.sendMessage(request.params.id, userId, request.body.content);
    reply.send({ message: 'Message sent', data: chat });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createChat, getMyChats, sendMessage };
