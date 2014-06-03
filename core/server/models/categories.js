// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

// ## Validate 
var nameValidator = [validate('isAlphanumeric')];

// ## Schema
var categorySchema = new Schema({
	id: { type: Number, required: true},
	name: { type: String, required: true, validate: nameValidator},
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Category', categorySchema);