// # Cleanz Data API
// Provides access to the data model for projects

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');


// ## Projects
projects = {

	// #### List

	// return list of all projects for one user
	list: function list(req, res) {

		var pros = new Array();

		// we get all project where user was in
		Project.find().populate({
			  path: 'users',
			  match: { _id: { $gte: req.session.user._id }}}).exec(function(err, pro) {
			for (var i = 0; i < pro.length; i++) {
				if (pro[i].users.length > 0) {
					console.log('ajout');
					pros.push(pro[i]);
					console.log(pros);
				}
			}

			return res.json(pros);
		});
	},

	// #### Read

	// return detail of one project
	read: function read(req, res) {
		console.log(req.params.id);

		Project.findOne({id: req.params.id}).populate('tasks','progress').populate('meetings','dateStart').populate('bugs','resolve').exec(function(err, pro) {
			return res.json(pro);
		});
	},

	// #### Create

	// create project to database and return flash message
    create: function add(req, res) {
		var pro = new Project(req.body);

		// get id for project
		 Project.findOne().sort({'id': -1}).limit(1).findOne(function(err,pr) {
		 	if (pr === null) { pro.id = 0; }
		 	else {
	            var newId = parseInt(pr.id) + 1;
	            pro.id = newId;
	        }

			// get user information
			User.findOne(req.session.user._id, function(err, usr){
				if (err) return handleError(err);

				// save project
				pro._creator = usr._id;
				pro.save(function(err, pro) {
					if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });

						// add project to user's project list
						usr.projects.push({ project: pro});
						usr.save(function(err) {
							if (err) return console.log(err);

							//push user to project user's list
							pro.users.push(usr);
							pro.save(function(err) {
								if (err) return console.log(err);
								else { return res.json({'flash': 'Votre projet a été crée avec succès'}); }
							});	
						});	
					});
			});
		});
		
	},

	// #### Edit

	// edit information to database and return flash message
	edit: function edit(req, res) {
		
		Project.findOne({id: req.params.id}, function(err,pro) {
			if (err) return handleError(err);
			pro.name = req.body.name;
			pro.save(function(err, pro) {
				if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
				return res.json({'flash': 'Votre projet a été modifié avec succès'});
			});
		});
	},

	// #### Delete

	// delete project into database
	delete: function remove(req, res) {
		Project.findOne({id: req.params.id}, function(err,pro) {
			if(err) console.log(err);
			pro.remove(function(err) {
				if (err) console.log(err);
				else {
					return res.json({'flash': 'Votre projet a été supprimé avec succès'});
				}
			});
		});
	},

	// #### List Users

	// return list of users for one project
	listUsers: function listUsers(req, res) {
			Project.findOne({id: req.params.id}).select('users').populate('users','firstName lastName').exec(function(err,pro) {
				return res.json(pro);
		});
	}

};

module.exports = projects;