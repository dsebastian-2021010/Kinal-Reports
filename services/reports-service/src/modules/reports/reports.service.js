const repository = require('./reports.repository');

const createReport = async (data, userId) => {

  return repository.create({
    ...data,
    generatedBy: userId
  });
};

const getReports = () => repository.getAll();

const getReport = async (id) => {
  const report = await repository.getById(id);

  if (!report) {
    const error = new Error('Report not found');
    error.statusCode = 404;
    throw error;
  }

  return report;
};

const deleteReport = async (id) => {
  const report = await repository.getById(id);

  if (!report) {
    const error = new Error('Report not found');
    error.statusCode = 404;
    throw error;
  }

  return repository.softDelete(id);
};

module.exports = {
  createReport,
  getReports,
  getReport,
  deleteReport
};