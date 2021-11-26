const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const CommentSchema = require('./Comment');

const ProjectSchema = new mongoose.Schema(
    {
        owner: {
            type: Number,
            required: true,
            unique: true
        },
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
        assets: {
            images:
            {
                data: Buffer,
                contentType: String
            },
            documents:
            {
                data: Buffer,
                contentType: String
            }
        },
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
        },
        comments: [CommentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
