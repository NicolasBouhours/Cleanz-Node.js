// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({
	_id: { type: Number, required: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	_creator: { type: Number, ref: 'User', required: true },
	_task: { type: Number, ref: 'Task', required: true},
});

// Users Models
module.exports = mongoose.model('Comment', commentSchema);