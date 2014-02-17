// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users');

// ## Create Project Schema
var projectSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	_creator: { type: Schema.Types.ObjectId, ref: 'User' },
	created_at: { type: Date, default: Date.now },
	tasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}],
	meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting'}],
	bugs: [{ type: Schema.Types.ObjectId, ref: 'Bug'}],
	documents: [{ type: Schema.Types.ObjectId, ref: 'Document'}],
	dutys: [{ type: Schema.Types.ObjectId, ref: 'Duty'}],
	logs: [{ type: Schema.Types.ObjectId, ref: 'Log'}],
	users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	categories: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
	messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
});

// ## Projectss Models
module.exports = mongoose.model('Project', projectSchema);