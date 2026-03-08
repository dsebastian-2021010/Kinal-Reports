const repository = require('./chat.repository');

const createChat = async (participants) => {

  if (participants.length < 2) {
    const error = new Error('Chat needs at least 2 participants');
    error.statusCode = 400;
    throw error;
  }

  return repository.create({ participants });
};

const getMyChats = (userId) =>
  repository.getByUser(userId);

const sendMessage = async (chatId, senderId, content) => {

  const chat = await repository.getById(chatId);

  if (!chat) {
    const error = new Error('Chat not found');
    error.statusCode = 404;
    throw error;
  }

  if (!chat.participants.includes(senderId)) {
    const error = new Error('Not allowed in this chat');
    error.statusCode = 403;
    throw error;
  }

  return repository.addMessage(chatId, {
    senderId,
    content
  });
};

module.exports = {
  createChat,
  getMyChats,
  sendMessage
};