// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var logSchema = new Schema({
	_id: { type: Number, required: true },
	name: { type: String, required: true },
	logId: { type: Number, required: true},
	created_at: { type: Date, default: Date.now },
	_creator: { type: Number, ref: 'User', required: true },
	_project: { type: Number, ref: 'Project', required: true },
	_logmessage: { type: Number, ref: 'LogMessage', required: true },
});

// Users Models
module.exports = mongoose.model('Log', logSchema);