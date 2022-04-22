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
    // design image url
    url: {
      type: String,
      required: true
    },
    // file name to display especially for pdf and other documents
    file_name: {
      type: String
    },
    limnu_boardUrl : {
      type: String
    },
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