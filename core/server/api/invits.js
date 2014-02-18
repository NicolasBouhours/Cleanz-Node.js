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
		User.findOne({id: req.session.user.id}).select('projects').where('projects.valid', 0)
		.populate('projects.project').exec(function(err, usr) {
			if (err) return handleError(err);
			return res.json(usr);
		});
	},

	// #### Accept

	// accept invitation and return flash message
	accept: function accept(req, res) {

		//get invits
		User.findOne({id: req.session.user.id}).select('projects').populate('projects.project')
		.where('projects.project.id', req.params.id).exec(function(err, usr) {

			//change validation to 1
			usr.projects[0].valid = 1;
			usr.save(function(err, u){
				if (err) return handleError(err);

				//add user to Project's list
				Project.findOne({'id': usr.projects[0].project.id}, function(err, pro){
					if (err) return handleError(err);
					User.findOne({id: req.session.user.id}, function(err,user) {
						if (err) return handleError(err);
						pro.users.push(user);
						pro.save(function(err, pr) {
							if (err) return handleError(err);
							return res.json({'flash': 'Vous venez de rejoindre le projet ' + usr.projects[0].project.name});
						});
					});
				});
			});
		});
	},

	// #### Refuse

	// refuse invitation and return flash message
	refuse: function refuse(req, res) {
		//get invits
		User.findOne({id: req.session.user.id}).select('projects').populate('projects.project')
		.where('projects.project.id', req.params.id).exec(function(err, usr) {

			// remove invits to our list
			usr.projects[0].remove();
			usr.save(function(err, u){
				if (err) return handleError(err);
				return res.json({'flash': 'Vous venez de refuser l\'invitation'});
			});
		});
	},
};

module.exports = invits;