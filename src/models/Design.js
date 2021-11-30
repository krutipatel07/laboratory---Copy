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
    versions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Version'
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
