// ## Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Project = require('./projects');
var FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');
var validate = require('mongoose-validator').validate;

// ## Validate 
var nameValidator = [validate('isAlphanumeric')];
var descrValidator = [validate('isDescr')];
var progressValidator = [validate('isNumeric')];
var dateValidator = [validate('isDate')];

// ## Schema
var taskSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true, validate: nameValidator},
	description: { type: String, validate: descrValidator },
	progress: { type: Number, min: 0, max: 100, required: true, validate: progressValidator},
	dateStart: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now, required: true, validate: dateValidator},
	dateEnd: {type: FormatDate, format: 'YYYY-MM-DD', default: Date.now, validate: dateValidator},
	_creator: { type: Number, ref: 'User', required: true },
	_project: { type: Number, ref: 'Project', required: true },
	_importance: { type: Schema.Types.ObjectId, ref: 'Importance'},
	_category: { type: Number, ref: 'Category' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
});

// ## Users Models
module.exports = mongoose.model('Task', taskSchema);