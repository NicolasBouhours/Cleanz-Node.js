// # Cleanz Data API
// Provides access to the data model for invitations

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');
var Log = require('../models/logs');
var LogApi = require('../api/logs');

// ## Invits
invits = {
	// #### List

	// get list of invitation for one user
	list: function list(req, res) {
		User.findOne({id: req.session.user.id}).select('invits').populate('invits').exec(function(err, invits) {
			if (err) console.log(err);
			return res.json(invits);
		});
	},

	// #### Create

	// create an invitation
	create: function add(req, res) {
		console.log(req.body);
		//find user
		User.findOne({email: req.body.email},function(err, usr) {

			//if user don't exist
			if(usr == null) {
				return res.json({'flash': 'Cet utilisateur n\'existe pas'});
			}

			//find project
			Project.findOne({id: req.body.projectId}, function(err, pro) {

				usr.invits.push(pro._id);
				usr.save();
				return res.json({'flash': 'L\'utilisateur a été invité a rejoindre le projet'});
			});
		});
	},

	// #### Accept

	// accept invitation and return flash message
	accept: function accept(req, res) {

		//get user
		User.findOne({_id: req.session.user._id}, function(err, usr) {

			//get project
			Project.findOne({id: req.params.id}, function(err, pro) {

				//add user to project
				pro.users.push(usr._id);
				usr.projects.push({ project: pro._id});

				//remove to invit list
				usr.invits.remove(pro._id);

				//save it
				pro.save();
				usr.save();

				// add into logs
				var log = new Log({'name': usr.firstName + ' ' + usr.lastName,'_creator': req.session.user._id, '_project': pro._id});
				LogApi.create(log, 15);

				return res.json({'flash': 'Vou avez rejoint le projet ' + pro.name});
			});
		});
	},

	// #### Refuse

	// refuse invitation and return flash message
	refuse: function refuse(req, res) {

		//find user
		User.findOne({_id: req.session.user._id}, function(err, usr) {

			//find project
			Project.findOne({id: req.params.id}, function(err, pro) {

				//remove project form list of invitation
				usr.invits.remove(pro._id);
				usr.save();

				return res.json({'flash': 'Vous avez refuser l\'invitation au projet ' + pro.name});
			});
		});	
	},
};

module.exports = invits;