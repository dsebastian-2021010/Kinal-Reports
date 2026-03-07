const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: String,
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
    location: {
      type: String,
      required: true
    },
    sections: [
      {
        type: String
      }
    ],
    createdBy: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['SCHEDULED', 'CANCELLED', 'COMPLETED'],
      default: 'SCHEDULED'
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);