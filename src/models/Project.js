const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ProjectSchema = new mongoose.Schema(
    {
        owner: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        title: {
            type: String,
            required: 'You must enter project title!',
            minlength: 1,
            maxlength: 50
        },
        description: {
            type: String,
            maxlength: 300
        },
        assets: [Object],
        budget: {
            type: Number,
            required: true
        },
        collaborators: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        designs: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Design'
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

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
