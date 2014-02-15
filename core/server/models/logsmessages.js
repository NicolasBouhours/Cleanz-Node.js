// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var logmessageSchema = new Schema({
	_id: { type: Number, required: true },
	name: { type: String, required: true },
});

// Users Models
module.exports = mongoose.model('LogMessage', logmessageSchema);