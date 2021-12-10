const mongoose = require('mongoose');
const CommentSchema = require('./Comment');

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
    comments: [CommentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = mongoose.models.Design || mongoose.model('Design', DesignSchema);


// 	
	// "comments":  {
	// 	"creator" : "61a8dcaf1ea0179c909f5b1c",
	// 	"version" : "61ada44148fa8d33f1f01c53",
	// 	"text" : "first comment for design 1",
	// 	"x_location" : "2",
	// 	"y_location" : "2"
	// }