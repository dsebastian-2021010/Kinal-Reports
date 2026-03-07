const service = require('./sections.service');

const createSection = async (request, reply) => {
  const section = await service.createSection(request.body);

  reply.code(201).send({
    message: 'Section created successfully',
    data: section
  });
};

const getSections = async (request, reply) => {
  const sections = await service.getSections();

  reply.send({
    total: sections.length,
    data: sections
  });
};

const getSection = async (request, reply) => {
  const section = await service.getSection(request.params.id);

  reply.send({
    data: section
  });
};

const deleteSection = async (request, reply) => {
  const section = await service.deleteSection(request.params.id);

  reply.send({
    message: 'Section soft deleted',
    data: section
  });
};

module.exports = {
  createSection,
  getSections,
  getSection,
  deleteSection
};