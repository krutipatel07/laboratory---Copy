const mongoose = require('mongoose');
const CommentSchema = require('./Comment');

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
    versionOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design'
  },
    versions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
      }
    ],
    url: {
      type: String,
      required: true
    },
    file_name: {
      type: String
    },
    limnu_boardUrl : {
      type: String
    },
    comments: [CommentSchema],
    collaborators: [
      {
        type: String
      }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = mongoose.models.Design || mongoose.model('Design', DesignSchema);