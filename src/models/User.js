const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Role = {
  ARCHITECTURE : 'ARCHITECTURE',
  CLIENT : 'CLIENT'
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
      unique: true,
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
      default: Role.ARCHITECTURE
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
