// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var messageSchema = new Schema({
	_id: { type: Number, required: true },
	text: { type: String, required: true},
	created_at: { type: Date, default: Date.now },
	_creator: { type: Number, ref: 'User', required: true },
	_user: { type: Number, ref: 'User', required: true },
	_project: { type: Number, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Message', messageSchema);