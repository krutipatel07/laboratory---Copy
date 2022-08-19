const mongoose = require('mongoose');

// database model for all stripe related details of user

const Stripe = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    customer_id: {
      type: String,
      required: true
    },
    subscription_id: {
      type: String
    },
    plan : {
        type: String
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    dateCreated: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = mongoose.models.Stripe || mongoose.model('Stripe', Stripe);
