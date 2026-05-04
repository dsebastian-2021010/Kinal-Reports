const service = require('./schedule.service');

const createSchedule = async (request, reply) => {
  try {
    const schedule = await service.createSchedule(request.body);
    reply.code(201).send({ message: 'Schedule created', data: schedule });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getSchedules = async (request, reply) => {
  try {
    const schedules = await service.getSchedules();
    reply.send({ total: schedules.length, data: schedules });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getSchedule = async (request, reply) => {
  try {
    const schedule = await service.getSchedule(request.params.id);
    reply.send({ data: schedule });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const deleteSchedule = async (request, reply) => {
  try {
    const schedule = await service.deleteSchedule(request.params.id);
    reply.send({ message: 'Schedule deleted', data: schedule });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createSchedule, getSchedules, getSchedule, deleteSchedule };
