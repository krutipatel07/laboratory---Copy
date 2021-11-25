const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const VersionSchema = new mongoose.Schema(
  {
    number: {
        type: Number,
        required: true,
    },
    image: {
      type: String,
      required: true,
      maxlength: 280 
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
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

module.exports = VersionSchema;
