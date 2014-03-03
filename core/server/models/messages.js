// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

// ## Validate 
var descrValidator = [validate('isDescr')];
var numericValidator = [validate('isNumeric')];
var dateValidator = [validate('isDate')];

// ## Schema
var messageSchema = new Schema({
	id: { type: Number, required: true },
	text: { type: String, required: true, validate: descrValidator },
	created_at: { type: Date, default: Date.now, validate: dateValidator },
	visibility: { type: Number, required: true, validate: numericValidator},
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Message', messageSchema);