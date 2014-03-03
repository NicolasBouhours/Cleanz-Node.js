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
var documentSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true, validate: nameValidator},
	description: { type: String, validate: descrValidator},
	size: { type: Number, validate: numericValidator},
	type: { type: String},
	created_at: { type: Date, default: Date.now, validate: dateValidator},
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true},
	_category: { type: Schema.Types.ObjectId, ref: 'Category'},
});

// Users Models
module.exports = mongoose.model('Document', documentSchema);