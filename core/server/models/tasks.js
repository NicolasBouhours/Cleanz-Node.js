// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./projects');
var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');


var taskSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	description: { type: String },
	progress: { type: Number, min: 0, max: 100, required: true },
	dateStart: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now, required: true},
	dateEnd: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now},
	_creator: { type: Number, ref: 'User', required: true },
	_project: { type: Number, ref: 'Project', required: true },
	_importance: { type: Schema.Types.ObjectId, ref: 'Importance'},
	_category: { type: Number, ref: 'Category' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
});

// Users Models
module.exports = mongoose.model('Task', taskSchema);