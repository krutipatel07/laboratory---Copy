const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Role = {
  Student : 'Student',
  Architect : 'Architect',
  Enterprise : 'Enterprise',
  Collaborator : 'Collaborator'
}
const Tier = {
  PROFESSIONAL : 'PROFESSIONAL',
  STUDENT : 'STUDENT'
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    avatar:
    {
      data: Buffer,
      contentType: String
    },
    role: {
      type: String,
      enum : Role,
      default: Role.Architect
    },
    tier: {
      type: String,
      enum : Tier,
      default: Tier.PROFESSIONAL
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    // to display tutorial
    isFirstTime: {
      type: Boolean,
      default:true
    },
    limnu_userId: {
      type: String,
    },
    limnu_token: {
      type: String,
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

UserSchema.virtual('projectCount').get(function() {
  return this.projects.length;
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
