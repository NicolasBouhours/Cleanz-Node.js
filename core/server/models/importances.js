// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

// ## Validate 
var nameValidator = [validate('isAlphanumeric')];

// ## Schema
var importanceSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true, validate: nameValidator},
});

// Users Models
module.exports = mongoose.model('Importance', importanceSchema);