// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bugSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	progress: { type: Number, min: 0, max: 100 },
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_category: { type: Schema.Types.ObjectId, ref: 'Category' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required:true },
	_task: { type: Schema.Types.ObjectId, ref: 'Task' },
});

// Users Models
module.exports = mongoose.model('Bug', bugSchema);