const Document = require('./documents.model');

const create = (data) => Document.create(data);

const getById = (id) =>
  Document.findOne({ _id: id, deletedAt: null });

const getAll = () =>
  Document.find({ deletedAt: null });

const update = (id, data) =>
  Document.findByIdAndUpdate(id, data, { new: true });

const softDelete = (id) =>
  Document.findByIdAndUpdate(
    id,
    {
      deletedAt: new Date()
    },
    { new: true }
  );

module.exports = {
  create,
  getById,
  getAll,
  update,
  softDelete
};