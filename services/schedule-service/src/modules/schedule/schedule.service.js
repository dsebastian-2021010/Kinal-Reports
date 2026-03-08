const repository = require('./schedule.repository');

const createSchedule = async (data) => {

  if (data.startTime >= data.endTime) {
    const error = new Error('Invalid time range');
    error.statusCode = 400;
    throw error;
  }

  return repository.create(data);
};

const getSchedules = () => repository.getAll();

const getSchedule = async (id) => {
  const schedule = await repository.getById(id);

  if (!schedule) {
    const error = new Error('Schedule not found');
    error.statusCode = 404;
    throw error;
  }

  return schedule;
};

const deleteSchedule = async (id) => {
  const schedule = await repository.getById(id);

  if (!schedule) {
    const error = new Error('Schedule not found');
    error.statusCode = 404;
    throw error;
  }

  return repository.softDelete(id);
};

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  deleteSchedule
};