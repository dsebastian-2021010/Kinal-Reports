const service = require('./teacherStatus.service');

const updateStatus = async (request, reply) => {
  try {
    const teacherId = request.headers['x-user-id'];
    const status = await service.updateStatus(teacherId, request.body);
    reply.send({ message: 'Status updated', data: status });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getStatus = async (request, reply) => {
  try {
    const status = await service.getStatus(request.params.teacherId);
    reply.send({ data: status });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getAll = async (request, reply) => {
  try {
    const statuses = await service.getAllStatuses();
    reply.send({ total: statuses.length, data: statuses });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { updateStatus, getStatus, getAll };
