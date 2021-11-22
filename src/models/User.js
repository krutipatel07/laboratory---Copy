const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Role = {
  ARCHITECTURE : 'ARCHITECTURE',
  CLIENT : 'CLIENT'
}
const Tier = {
  PROFESSIONAL : 'PROFESSIONAL',
  STUDENT : 'STUDENT'
}

const userSchema = new Schema(
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
        type: Schema.Types.ObjectId,
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

userSchema.virtual('projectCount').get(function() {
  return this.projects.length;
});

const User = model('User', userSchema);

module.exports = User;
