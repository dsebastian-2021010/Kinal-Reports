const Chat = require('./chat.model');

const create = (data) => Chat.create(data);

const getByUser = (userId) =>
  Chat.find({
    participants: userId,
    deletedAt: null
  });

const getById = (id) =>
  Chat.findOne({ _id: id, deletedAt: null });

const addMessage = (chatId, message) =>
  Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: message } },
    { new: true }
  );

module.exports = {
  create,
  getByUser,
  getById,
  addMessage
};