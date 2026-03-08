const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: String,
        required: true
      }
    ],
    messages: [messageSchema],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);