// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var documentSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true},
	size: { type: Number },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	_creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true},
	_category: { type: Schema.Types.ObjectId, ref: 'Category'},
});

// Users Models
module.exports = mongoose.model('Document', documentSchema);