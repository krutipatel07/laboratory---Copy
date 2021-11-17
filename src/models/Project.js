const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ProjectSchema = new Schema(
    {
        owner: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: 'You must enter project title!',
            minlength: 1,
            maxlength: 280
        },
        description: {
            type: String,
            maxlength: 280
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
            type: Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        designs: [
          {
            type: Schema.Types.ObjectId,
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

const Project = model('Project', ProjectSchema);

module.exports = Project;
