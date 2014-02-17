// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
	id: { type: Number, required: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_task: { type: Schema.Types.ObjectId, ref: 'Task', required: true},
});

// Users Models
module.exports = mongoose.model('Comment', commentSchema);