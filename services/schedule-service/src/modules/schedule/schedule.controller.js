const service = require('./schedule.service');

const createSchedule = async (request, reply) => {
  const schedule = await service.createSchedule(request.body);

  reply.code(201).send({
    message: 'Schedule created successfully',
    data: schedule
  });
};

const getSchedules = async (request, reply) => {
  const schedules = await service.getSchedules();

  reply.send({
    total: schedules.length,
    data: schedules
  });
};

const getSchedule = async (request, reply) => {
  const schedule = await service.getSchedule(request.params.id);

  reply.send({ data: schedule });
};

const deleteSchedule = async (request, reply) => {
  const schedule = await service.deleteSchedule(request.params.id);

  reply.send({
    message: 'Schedule soft deleted',
    data: schedule
  });
};

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  deleteSchedule
};