const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    career: {
      type: String,
      required: true
    },
    grade: {
      type: Number,
      required: true
    },
    shift: {
      type: String,
      enum: ['AM', 'PM'],
      required: true
    },
    isTechnical: {
      type: Boolean,
      default: true
    },
    combinedWith: [
      {
        type: String
      }
    ],
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

module.exports = mongoose.model('Section', sectionSchema);