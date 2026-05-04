const service = require('./notifications.service');

const createNotification = async (request, reply) => {
  try {
    const notification = await service.createNotification(request.body);
    reply.code(201).send({ message: 'Notification created', data: notification });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getMyNotifications = async (request, reply) => {
  try {
    const userId = request.headers['x-user-id'];
    const notifications = await service.getUserNotifications(userId);
    reply.send({ total: notifications.length, data: notifications });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const markAsRead = async (request, reply) => {
  try {
    const notification = await service.readNotification(request.params.id);
    reply.send({ message: 'Notification marked as read', data: notification });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createNotification, getMyNotifications, markAsRead };
