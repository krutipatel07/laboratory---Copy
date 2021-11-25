const mongoose = require('mongoose');

const DesignSchema = new mongoose.Schema(
  {
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
      type: String,
      required: true,
      maxlength: 280 
    },
    versions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Version'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = DesignSchema;
