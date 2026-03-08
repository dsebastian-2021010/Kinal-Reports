const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    sectionCode: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    teacherId: {
      type: String,
      required: true
    },
    classroom: {
      type: String,
      required: true
    },
    day: {
      type: String,
      enum: ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY'],
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE'
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Schedule', scheduleSchema);