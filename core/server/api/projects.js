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
		/*
		User.findOne({id: req.session.user.id}).select('projects').where('projects.valid', 1)
		.populate('projects.project').where('projects.valid', 1).exec(function(err, usr) {
			console.log(usr);
			if (err) console.log(err);
				return res.json(usr);
		});
*/		
/*
		User.findOne({id: req.session.user.id}).populate('projects.project').select('projects').exec(function(err, pros) {
			if(err) console.log(err);
			console.log(pros);
			return res.json(pros);
		});*/

		Project.find().populate({path: 'users',match: { _id: req.session.user._id},select: 'projects'}).exec(function(err, pro) {
			console.log(pro);
			return res.json(pro);
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

};

module.exports = projects;