const repository = require('./teacherStatus.repository');

const updateStatus = async (teacherId, data) => {
  return repository.createOrUpdate(teacherId, data);
};

const getStatus = async (teacherId) => {
  const status = await repository.getByTeacherId(teacherId);

  if (!status) {
    const error = new Error('Teacher status not found');
    error.statusCode = 404;
    throw error;
  }

  return status;
};

const getAllStatuses = () => repository.getAll();

module.exports = {
  updateStatus,
  getStatus,
  getAllStatuses
};