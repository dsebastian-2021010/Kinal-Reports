const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  action: String,
  performedBy: String,
  date: {
    type: Date,
    default: Date.now
  },
  comment: String
});

const documentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true
    },
    studentName: {
      type: String,
      required: true
    },
    sectionCode: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: [
        'PRACTICAS_SUPERVISADAS',
        'PERMISO_FALTA',
        'JUSTIFICACION',
        'CARTA_GENERAL'
      ],
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: [
        'PENDING',
        'APPROVED',
        'REJECTED',
        'READY_TO_PRINT'
      ],
      default: 'PENDING'
    },
    coordinatorId: String,
    history: [historySchema],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('DocumentRequest', documentSchema);