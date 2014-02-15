// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bugSchema = new Schema({
	_id: { type: Number, required: true },
	name: { type: String, required: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	progress: { type: Number, min: 0, max: 100 },
	_creator: { type: Number, ref: 'User', required: true },
	_category: { type: Number, ref: 'Category' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	_project: { type: Number, ref: 'Project', required:true },
	_task: { type: Number, ref: 'Task' },
});

// Users Models
module.exports = mongoose.model('Bug', bugSchema);