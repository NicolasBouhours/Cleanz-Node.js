// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

// ## Validate 
var nameValidator = [validate('isAlphanumeric')];
var descrValidator = [validate('isDescr')];
var numericValidator = [validate('isNumeric')];
var dateValidator = [validate('isDate')];

// ## Schema
var bugSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true, validate: nameValidator},
	description: { type: String, validate: descrValidator},
	resolve: { type: Number, required: true, validate: numericValidator},
	created_at: { type: Date, default: Date.now, validate: dateValidator},
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_category: { type: Schema.Types.ObjectId, ref: 'Category' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required:true },
	_task: { type: Schema.Types.ObjectId, ref: 'Task' },
	users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
});

// Users Models
module.exports = mongoose.model('Bug', bugSchema);