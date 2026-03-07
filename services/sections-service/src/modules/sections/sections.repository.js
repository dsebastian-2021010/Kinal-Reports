const Section = require('./sections.model');

const createSection = (data) => Section.create(data);

const getSectionById = (id) =>
  Section.findOne({ _id: id, deletedAt: null });

const getByCode = (code) =>
  Section.findOne({ code, deletedAt: null });

const getAll = () =>
  Section.find({ deletedAt: null });

const updateSection = (id, data) =>
  Section.findOneAndUpdate(
    { _id: id, deletedAt: null },
    data,
    { new: true }
  );

const softDelete = (id) =>
  Section.findByIdAndUpdate(
    id,
    {
      status: 'INACTIVE',
      deletedAt: new Date()
    },
    { new: true }
  );

module.exports = {
  createSection,
  getSectionById,
  getByCode,
  getAll,
  updateSection,
  softDelete
};