// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var meetingSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	description: { type: String },
	dateStart: { type: Date, required: true },
	duree: { type: Number },
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Meeting', meetingSchema);