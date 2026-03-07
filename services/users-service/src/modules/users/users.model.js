const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    authId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['ALUMNO', 'PROFESOR', 'ADMINISTRADOR'],
      required: true
    },
    academicInfo: {
      sectionCode: String,
      career: String,
      grade: Number,
      shift: String
    },
    teacherInfo: {
      subjects: [String],
      isCoordinator: Boolean
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'GRADUATED'],
      default: 'ACTIVE'
    },
    deletedAt: {
      type: Date,
      default: null
}
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserProfile', userSchema);