const Event = require('./events.model');

const create = (data) => Event.create(data);

const getAll = () =>
  Event.find({ deletedAt: null });

const getById = (id) =>
  Event.findOne({ _id: id, deletedAt: null });

const update = (id, data) =>
  Event.findByIdAndUpdate(id, data, { new: true });

const softDelete = (id) =>
  Event.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), status: 'CANCELLED' },
    { new: true }
  );

module.exports = {
  create,
  getAll,
  getById,
  update,
  softDelete
};