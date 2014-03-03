// ## Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;

// ## Validate
var nameValidator = [validate('len', 2, 30), validate('isAlphanumeric')];
var passwordValidator = [validate('len', 8, 30), validate('isAlphanumeric')];
var emailValidator=[validate('len',6, 60), validate('isEmail')];
var phoneValidator=[validate('len',9,15), validate('isNumeric')];

// ## Schema
var userSchema = new Schema({
	id: { type: Number, required: true },
	firstName:  { type: String, required: true, validate: nameValidator },
	lastName: { type: String, required: true, validate: nameValidator },
	email: { type: String, required: true, validate: emailValidator },
	phone: { type: String, required: true, validate: phoneValidator },
	password: { type: String, required: true, validate: passwordValidator },
	created_at: { type: Date, default: Date.now },
	invits: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
	projects: [{
		project: { type: Schema.Types.ObjectId, ref: 'Project' }, 
		duty: { type: Schema.Types.ObjectId, ref: 'Duty' }
	}],
});

// ## Users Models
module.exports = mongoose.model('User', userSchema);