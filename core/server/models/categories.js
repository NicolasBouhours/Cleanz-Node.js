// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categorySchema = new Schema({
	_id: { type: Number, required: true },
	name: { type: String, required: true },
	_project: { type: Number, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Category', categorySchema);