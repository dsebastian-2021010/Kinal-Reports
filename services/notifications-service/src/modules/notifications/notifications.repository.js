const Notification = require('./notifications.model');

const create = (data) => Notification.create(data);

const getByUser = (userId) =>
  Notification.find({ userId, deletedAt: null });

const getById = (id) =>
  Notification.findOne({ _id: id, deletedAt: null });

const markAsRead = (id) =>
  Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );

const softDelete = (id) =>
  Notification.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );

module.exports = {
  create,
  getByUser,
  getById,
  markAsRead,
  softDelete
};