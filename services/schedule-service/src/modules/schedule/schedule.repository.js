const Schedule = require('./schedule.model');

const create = (data) => Schedule.create(data);

const getAll = () =>
  Schedule.find({ deletedAt: null });

const getById = (id) =>
  Schedule.findOne({ _id: id, deletedAt: null });

const getBySection = (sectionCode) =>
  Schedule.find({ sectionCode, deletedAt: null });

const softDelete = (id) =>
  Schedule.findByIdAndUpdate(
    id,
    {
      status: 'INACTIVE',
      deletedAt: new Date()
    },
    { new: true }
  );

module.exports = {
  create,
  getAll,
  getById,
  getBySection,
  softDelete
};