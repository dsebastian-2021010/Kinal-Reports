const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['DOCUMENTS', 'EVENTS', 'TEACHERS', 'SYSTEM'],
      required: true
    },
    generatedBy: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);