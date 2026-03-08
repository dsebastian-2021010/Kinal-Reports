const service = require('./teacherStatus.service');

const updateStatus = async (request, reply) => {
  const teacherId = request.headers['x-user-id'];

  const status = await service.updateStatus(
    teacherId,
    request.body
  );

  reply.send({
    message: 'Status updated',
    data: status
  });
};

const getStatus = async (request, reply) => {
  const status = await service.getStatus(
    request.params.teacherId
  );

  reply.send({ data: status });
};

const getAll = async (request, reply) => {
  const statuses = await service.getAllStatuses();

  reply.send({
    total: statuses.length,
    data: statuses
  });
};

module.exports = {
  updateStatus,
  getStatus,
  getAll
};