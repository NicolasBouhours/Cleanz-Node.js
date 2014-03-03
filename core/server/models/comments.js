// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

// ## Validate 

var descrValidator = [validate('isDescr')];
var dateValidator = [validate('isDate')];

// ## Schema
var commentSchema = new Schema({
	id: { type: Number, required: true },
	description: { type: String, validate: descrValidator},
	created_at: { type: Date, default: Date.now, validate: dateValidator},
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_task: { type: Schema.Types.ObjectId, ref: 'Task', required: true},
});

// Users Models
module.exports = mongoose.model('Comment', commentSchema);