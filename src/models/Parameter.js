const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
import Double from '@mongoosejs/double';

const ParameterSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true
    },
    floor: {
        type: Number
    },
    sqft: {
        type: Double
    },
    beds: {
        type: Number
    },
    baths: {
        type: Double
    },
    garages: {
        type: Number
    },
    url: {
      type: String,
      required: true
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

module.exports = mongoose.models.Parameter || mongoose.model('Parameter', ParameterSchema);
