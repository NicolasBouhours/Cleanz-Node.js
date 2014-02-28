// Get Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id: { type: Number, required: true },
	firstName:  { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	invits: [{ type: Schema.Types.ObjectId, ref: 'Project'}],
	projects: [{
		project: { type: Schema.Types.ObjectId, ref: 'Project' }, 
		duty: { type: Schema.Types.ObjectId, ref: 'Duty' }
	}],
});

// Users Models
module.exports = mongoose.model('User', userSchema);