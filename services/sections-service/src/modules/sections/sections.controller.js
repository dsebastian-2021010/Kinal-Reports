const service = require('./sections.service');

const createSection = async (request, reply) => {
  try {
    const section = await service.createSection(request.body);
    reply.code(201).send({ message: 'Section created', data: section });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getSections = async (request, reply) => {
  try {
    const sections = await service.getSections();
    reply.send({ total: sections.length, data: sections });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const getSection = async (request, reply) => {
  try {
    const section = await service.getSection(request.params.id);
    reply.send({ data: section });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

const deleteSection = async (request, reply) => {
  try {
    const section = await service.deleteSection(request.params.id);
    reply.send({ message: 'Section deleted', data: section });
  } catch (error) {
    reply.code(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = { createSection, getSections, getSection, deleteSection };
