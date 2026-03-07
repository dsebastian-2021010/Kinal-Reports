const service = require('./notifications.service');

const createNotification = async (request, reply) => {
  const notification = await service.createNotification(request.body);

  reply.code(201).send({
    message: 'Notification created',
    data: notification
  });
};

const getMyNotifications = async (request, reply) => {
  const userId = request.headers['x-user-id'];

  const notifications = await service.getUserNotifications(userId);

  reply.send({
    total: notifications.length,
    data: notifications
  });
};

const markAsRead = async (request, reply) => {
  const notification = await service.readNotification(request.params.id);

  reply.send({
    message: 'Notification marked as read',
    data: notification
  });
};

module.exports = {
  createNotification,
  getMyNotifications,
  markAsRead
};