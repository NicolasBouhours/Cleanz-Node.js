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
var meetingSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true, validate: nameValidator},
	description: { type: String, validate: descrValidator},
	place: { type: String, validate: nameValidator},
	dateStart: { type: Date, required: true, validate: dateValidator},
	timeStart: { type: String },
	duree: { type: Number, validate: numericValidator},
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Meeting', meetingSchema);