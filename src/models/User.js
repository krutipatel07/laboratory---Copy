const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const Role = {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
const Tier = {
  ADMIN = 'ADMIN',
  USER = 'USER'
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
      default: Role.USER
    },
    tier: {
      type: String,
      enum : Tier,
      default: Tier.USER
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
      virtuals: true
    }
  }
);

userSchema.virtual('projectCount').get(function() {
  return this.projects.length;
});

const User = model('User', userSchema);

module.exports = User;
