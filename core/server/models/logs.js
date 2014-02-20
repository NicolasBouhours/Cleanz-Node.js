// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var logSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
	_logmessage: { type: Schema.Types.ObjectId, ref: 'LogMessage', required: true },
});

// Users Models
module.exports = mongoose.model('Log', logSchema);