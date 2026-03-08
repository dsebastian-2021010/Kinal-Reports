const repository = require('./sections.repository');

const createSection = async (data) => {

  const existing = await repository.getByCode(data.code);

  if (existing) {
    const error = new Error('Section code already exists');
    error.statusCode = 400;
    throw error;
  }

  return repository.createSection(data);
};

const getSections = () => repository.getAll();

const getSection = async (id) => {
  const section = await repository.getSectionById(id);

  if (!section) {
    const error = new Error('Section not found');
    error.statusCode = 404;
    throw error;
  }

  return section;
};

const deleteSection = async (id) => {
  const section = await repository.getSectionById(id);

  if (!section) {
    const error = new Error('Section not found');
    error.statusCode = 404;
    throw error;
  }

  return repository.softDelete(id);
};

module.exports = {
  createSection,
  getSections,
  getSection,
  deleteSection
};