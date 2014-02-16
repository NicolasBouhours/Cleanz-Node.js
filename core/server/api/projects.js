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

		Project.find({ _creator: req.session.user._id}).exec(function(err, pro) {
			if (err) return handleError(err);
			return res.json(pro);
		});
	},

	// #### Read

	// return detail of one project
	read: function read(req, res) {

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
				if (err) { console.log(err); return res.json({'flash': 'Impossible de crée le projet'}); }

				// save project
				pro._creator = usr._id;
				pro.save(function(err, project) {
					if (err) { console.log(err); return res.json({'flash': 'Impossible de crée le projet'}); }

						// add project to user's project list
						usr.projects.push(project);
						usr.save(function(err) {
							if (err) { console.log(err); return res.json({'flash': 'Impossible de crée le projet'}); }
							else { return res.json({'flash': 'Votre projet a été crée avec succès'}); }
						});	
					});
			});
		});
		
	},

	// #### Edit

	// edit information to database and return flash message
	edit: function edit(req, res) {
		
	},

	// #### Delete

	// delete project into database
	delete: function remove(req, res) {

	},

};

module.exports = projects;