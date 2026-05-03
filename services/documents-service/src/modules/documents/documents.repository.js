const Document = require('./documents.model');

const create = (data) => Document.create(data);

const getAll = (filters = {}) => {
  const query = { deletedAt: null };
  if (filters.studentId) query.studentId = filters.studentId;
  if (filters.sectionCode) query.sectionCode = filters.sectionCode;
  if (filters.status) query.status = filters.status;
  if (filters.type) query.type = filters.type;
  return Document.find(query).sort({ createdAt: -1 });
};

const getById = (id) =>
  Document.findOne({ _id: id, deletedAt: null });

const update = (id, data) =>
  Document.findByIdAndUpdate(id, data, { new: true });

const softDelete = (id) =>
  Document.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });

module.exports = { create, getAll, getById, update, softDelete };
