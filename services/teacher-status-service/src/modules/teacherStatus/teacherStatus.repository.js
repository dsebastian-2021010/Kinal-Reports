const TeacherStatus = require('./teacherStatus.model');

const createOrUpdate = (teacherId, data) =>
  TeacherStatus.findOneAndUpdate(
    { teacherId },
    { ...data, updatedAtManual: new Date() },
    { new: true, upsert: true }
  );

const getByTeacherId = (teacherId) =>
  TeacherStatus.findOne({ teacherId });

const getAll = () =>
  TeacherStatus.find();

module.exports = {
  createOrUpdate,
  getByTeacherId,
  getAll
};