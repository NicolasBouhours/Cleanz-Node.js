// # Cleanz Data API
// Provides access to the data model for tasks

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');
var Task = require('../models/tasks');
var Importance = require('../models/importances');

// ## Tasks 
tasks = {

	// #### List

	// return list of all tasks for one projet
	list: function list(req, res) {
		console.log(req.params.id);
		Task.find({_project: 0}).populate('_importance').exec(function(err, tasks) {
			if (err) console.log(err);
			return res.json(tasks);
		});	
	},

	// #### Read

	// return all details for one task and his comments
	read: function read(req, res) {
		Task.findOne({id: req.params.id}).populate('_importance').exec(function(err, task) {
			if (err) console.log(err);
			return res.json(task);
		});
	},

	// #### Create

	// store task into database and return flash message
	create: function add(req, res) {
		var task = new Task(req.body);
		var id = 0;

		// get id for project
		Task.findOne().sort({'id': -1}).limit(1).findOne(function(err,ta) {
		 	if (ta === null) { id = 0; }
		 	else {
	             id = parseInt(ta.id) + 1;
	        }
	    });

		// attribute info to task
		task.id = id;
		task._creator = req.session.user.id;
		task._project = req.body.projectId;
		task.progress = 0;
		
		// get importance
		Importance.findOne({id: req.body.importance }, function(err, imp) {
			impor = imp._id;
			task._importance = imp._id;

			// save task
			task.save(function(err, t) {
				if (err) console.log(err); 

				// save task into project's list
				Project.findOne({'id': req.body.projectId}, function(err, pro){
					if (err) return handleError(err);
					pro.tasks.push(t);
					pro.save(function(err, pr) {
						if (err) return handleError(err);
							return res.json({'flash': 'Vous venez d\'ajouté la tache ' + t.name});
					});
				});
			});
		});
	},

	// #### Edit

	// edit task information into database and return flash message
	edit: function edit(req, res) {

        Task.findOne(req.params.id, function(err, ta) {
        	ta.name = req.body.name;
        	ta.description = req.body.description;
        	ta.dateStart = req.body.dateStart;
        	ta.dateEnd = req.body.dateEnd;
        	ta.progress = req.body.progress;

        	Importance.findOne({id: req.body.importance}, function(err, i) {
        		ta._importance = i._id;
	            ta.save(function (err, taS) {

	                res.json({'flash': 'Votre tache a bien été modifié'});
	            });
        	})
        });
	},

	// #### Delete

	// remove task into database and return flash message
	delete: function remove(req, res) {

		Task.find(req.params.id, function(err, ta) {
			ta.remove(function(err) {
				if (err) console.log(err);
					res.json({'flash': 'Votre tache a été supprimé'});
			});
		});
	},
};

module.exports = tasks;