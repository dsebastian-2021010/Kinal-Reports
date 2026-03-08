const mongoose = require('mongoose');

const teacherStatusSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: [
        'IN_CLASS',
        'AVAILABLE',
        'LUNCH',
        'EVENT',
        'ABSENT'
      ],
      default: 'AVAILABLE'
    },
    currentClassroom: {
      type: String
    },
    currentSectionCode: {
      type: String
    },
    notes: {
      type: String
    },
    updatedAtManual: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeacherStatus', teacherStatusSchema);