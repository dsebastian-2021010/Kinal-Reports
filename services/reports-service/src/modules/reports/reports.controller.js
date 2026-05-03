const service = require('./reports.service');

const createReport = async (request, reply) => {
  try {
    const userId = request.headers['x-user-id'];
    const report = await service.createReport(request.body, userId);
    reply.code(201).send({ message: 'Report generated', data: report });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getReports = async (request, reply) => {
  try {
    const reports = await service.getReports();
    reply.send({ total: reports.length, data: reports });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getReport = async (request, reply) => {
  try {
    const report = await service.getReport(request.params.id);
    reply.send({ data: report });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const deleteReport = async (request, reply) => {
  try {
    const report = await service.deleteReport(request.params.id);
    reply.send({ message: 'Report deleted', data: report });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createReport, getReports, getReport, deleteReport };
