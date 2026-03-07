const repository = require('./notifications.repository');

const createNotification = (data) => repository.create(data);

const getUserNotifications = (userId) =>
  repository.getByUser(userId);

const readNotification = async (id) => {
  const notification = await repository.getById(id);

  if (!notification) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }

  return repository.markAsRead(id);
};

module.exports = {
  createNotification,
  getUserNotifications,
  readNotification
};