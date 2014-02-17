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
		console.log(req.session.user.id);
		User.findOne({id: req.session.user.id}).select('projects')
		.populate('projects.project').where('projects.valid', 1).exec(function(err, usr) {
			console.log(usr);
			if (err) console.log(err);
				return res.json(usr);
		});
	},

	// #### Read

	// return detail of one project
	read: function read(req, res) {
		console.log(req.params.id);
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
					if (err) return handleError(err);

						// add project to user's project list
						usr.projects.push({ project: pro, valid: 1});
						usr.save(function(err) {
							if (err) return handleError(err);

							//push user to project user's list
							pro.users.push(usr);
							pro.save(function(err) {
								if (err) return handleError(err);
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
				if (err) return handleError(err);
				return res.json({'flash': 'Votre projet a été modifié avec succès'});
			});
		});
	},

	// #### Delete

	// delete project into database
	delete: function remove(req, res) {
		Project.findOne({id: req.params.id}, function(err,pro) {
			if (err) return handleError(err);
			pro.remove(function(err) {
				if (err) return handleError(err);
				else {
					return res.json({'flash': 'Votre projet a été supprimé avec succès'});
				}
			});
		});
	},

	// #### Add User 

	// send invitation to user for join project
	addUser: function addUser(req,res) {

		//get user
		User.findOne({email: req.body.email}, function(err, usr) {
			if (err) return handleEerror(err);

			// if user don't exist
			if (usr === null) return res.json({'flash': 'Aucun utilisate n\'existe avec cet email'});

			//get project
			Project.findOne({id: req.body.projectId }, function(err, pro) {
				if (err) return handleEerror(err);

				//if user participe already to the project
				User.findOne({id: req.session.user.id}).select('projects').populate('projects.project')
				.where('projects.project.id', req.body.projectId).exec(function(err, usr) {
					if (err) return handleEerror(err);
					if (usr != null) {
						return res.json('Cet utilisateur participe déja à ce projet');
					}
				});

				//add project into user's project list
				usr.projects.push({ project: pro, valid: 0});
				usr.save(function(err) {
					if (err) { console.log(err); return res.json({'flash': 'Impossible d\'inviter l\'utilisateur'}); }
					else { return res.json({'flash': 'L\' utilisateur a été invité a rejoindre le projet.'}); }
				});	
			});
		});
	},
};

module.exports = projects;