// # Cleanz Data API
// Provides access to the data model for invitations

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');

// ## Invits
invits = {

	// #### List

	// get list of invitation for one user
	list: function list(req, res) {
		User.findOne({id: req.session.user.id}).select('projects').populate('projects.project').where('projects.valid', 0).exec(function(err, usr) {
			if (err) return handleError(err);
			return res.json(usr);
		});
	},

	// #### Accept

	// accept invitation and return flash message
	accept: function accept(req, res) {

	},

	// #### Refuse

	// refuse invitation and return flash message
	refuse: function refuse(req, res) {

	},
};

module.exports = invits;