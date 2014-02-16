// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var importanceSchema = new Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
});

// Users Models
module.exports = mongoose.model('Importance', importanceSchema);