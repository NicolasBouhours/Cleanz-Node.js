// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	_id: Number,
	firstName:  String,
	lastName: String,
	email: String,
	phone: String,
	password: String,
	created_at: { type: Date, default: Date.now },
});

// Users Models
module.exports = mongoose.model('User', userSchema);