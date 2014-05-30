// # Cleanz Data API
// Provides access to the data model for bugs

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Bug = require('../models/bugs');
var Project = require('../models/projects');
var Log = require('../models/logs');
var Category = require('../models/categories');
var LogApi = require('../api/logs');

// ## Bugs 
bugs = {

	// #### List

	// return list of all bugs for one project
	list: function list(req, res) {
		Project.findOne({'id':req.params.projectId}, function(err, pro) {
			Bug.find({_project: pro._id}).populate('_creator', 'id firstName lastName')
			.populate('_category','name').populate('users','firstName lastName').exec(function(err, bugs) {
				if (err) console.log(err);
				return res.json(bugs);
			});
		});
	},

	// #### Read

	// return detail for bug
	read: function read(req, res) {

		Bug.findOne({id: req.params.id}).populate('comments').populate('_creator','id firstName lastName')
		.populate('_category','name id').populate('users','firstName lastName').exec(function(err, bug) {
			if (err) console.log(err);
			return res.json(bug);
		});
	},

	// #### Create

	// store into database a bug
	create: function add(req, res) {
		var bug = new Bug(req.body);

		// get id for bug
		 Bug.findOne().sort({'id': -1}).limit(1).findOne(function(err,bg) {
		 	if (bg === null) { bug.id = 0; }
		 	else {
	            var newId = parseInt(bg.id) + 1;
	            bug.id = newId;
	        }

	        // add other information
	        bug._creator = req.session.user._id;
	        bug.resolve = 0;

	        if(req.body.usersadd != null) {

		        // add users into bugs 
				for (var i = 0; i < req.body.usersadd.length; i++) {
					var split = req.body.usersadd[i].split(' ');
					User.findOne().where('firstName').equals(split[0]).where('lastName').equals(split[1]).exec(function(err, usr) {
						if (err) { console.log(err); }
						bug.users.push(usr);
					});
				}
			}

        	// add bug into project list
        	Project.findOne({'id': req.body.projectId}, function(err, pro){
				if (err) return console.log(err);
				console.log(pro);
				bug._project = pro._id;

				//add category
				Category.findOne({id: req.body.category}, function(err, cat) {
					if (cat != null) {
						bug._category = cat._id;
					}


			        //save bug
			        console.log(bug);
		       		bug.save(function(err, b) {
		        		if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
							pro.bugs.push(b);
							pro.save(function(err, pr) {
								if (err) return console.log(err);

								// add into logs
								var log = new Log({'name': b.name,'_creator': req.session.user._id, '_project': pr._id});
								LogApi.create(log, 10);

								return res.json({'flash': 'Vous venez d\'ajouté le bug' + b.name});
							});
					});
		       	});
	        });
	    });
	},

	// #### Edit

	//edit bug into database
	edit: function edit (req, res) {

		// find our bug
		Bug.findOne({id: req.params.id}, function(err, bug) {
			if (err) console.log(err);

			// modify bug information
			bug.name = req.body.name;
			bug.description = req.body.description;
			bug.resolve = req.body.resolve;

			bug.users = new Array();
			
			if(req.body.usersadd != null) {

				// add users into bugs 
				for (var i = 0; i < req.body.usersadd.length; i++) {
					var split = req.body.usersadd[i].split(' ');
					User.findOne().where('firstName').equals(split[0]).where('lastName').equals(split[1]).exec(function(err, usr) {
						if (err) { console.log(err); }
						bug.users.push(usr);
					});
				}
			}

			//add category
			Category.findOne({id: req.body.category}, function(err, cat) {
				if (cat != null) {
					bug._category = cat._id;
				}

				// save it
				bug.save(function(err, b) {
					if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });

					// add into logs
					var log = new Log({'name': b.name,'_creator': req.session.user._id, '_project': b._project});
					LogApi.create(log, 11);

					return res.json({'flash': 'Votre bug a été modifié'});
				});
			});
		});
	},

	// #### Delete

	// delete a bug into database
	delete: function remove(req, res) {
		Bug.findOne({id: req.params.id}, function(err, bug) {

			if (bug._creator == req.session.user._id) {
				// add into logs
				var log = new Log({'name': bug.name,'_creator': req.session.user._id, '_project': bug._project});
				LogApi.create(log, 12);

				// remove it
				bug.remove();
			}
			else {
				return res.json({'flash': 'Seul le créateur du bug a le droit de la supprimer'});
			}

			return res.json({'flash': 'Votre bug a été supprimé'});
		});	
	},

};

// ## Export bug module
module.exports = bugs;
