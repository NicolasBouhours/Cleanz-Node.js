// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categorySchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
	_project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Users Models
module.exports = mongoose.model('Category', categorySchema);