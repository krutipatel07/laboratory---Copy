const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new mongoose.Schema(
  {
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    version: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Version',
        required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: 280
    },
    dateCreated: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = CommentSchema;
