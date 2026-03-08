const User = require('./users.model');

const createUser = (data) => User.create(data);

const getUserById = (id) =>
  User.findOne({ _id: id, deletedAt: null });

const getAllUsers = () =>
  User.find({ deletedAt: null });

const updateUser = (id, data) =>
  User.findOneAndUpdate(
    { _id: id, deletedAt: null },
    data,
    { new: true }
  );

const getByAuthId = (authId) =>
  User.findOne({ authId, deletedAt: null });

const softDeleteUser = (id) =>
  User.findByIdAndUpdate(
    id,
    {
      status: 'INACTIVE',
      deletedAt: new Date()
    },
    { new: true }
  );

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  getByAuthId,
  softDeleteUser
};