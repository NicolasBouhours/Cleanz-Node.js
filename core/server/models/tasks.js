// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./projects');


var taskSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	description: { type: String },
	progress: { type: Number, min: 0, max: 100, required: true },
	dateStart: { type: Date, default: Date.now, required: true },
	dateEnd: { type: Date },
	_creator: { type: Number, ref: 'User', required: true },
	_project: { type: Number, ref: 'Project', required: true },
	_category: { type: Number, ref: 'Category' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	_importance: { type: Number, ref: 'Importance'},
});

// Users Models
module.exports = mongoose.model('Task', taskSchema);