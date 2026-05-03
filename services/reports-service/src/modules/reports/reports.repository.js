const Report = require('./reports.model');

const create = (data) => Report.create(data);

const getAll = () =>
  Report.find({ deletedAt: null });

const getById = (id) =>
  Report.findOne({ _id: id, deletedAt: null });

const softDelete = (id) =>
  Report.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  );

module.exports = {
  create,
  getAll,
  getById,
  softDelete
};