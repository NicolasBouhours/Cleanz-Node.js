// # Cleanz Data API
// Provides access to the data model for tasks

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');
var Task = require('../models/tasks');
var Importance = require('../models/importances');
var Log = require('../models/logs');
var Category = require('../models/categories');
var LogApi = require('../api/logs');

// ## Tasks 
tasks = {

	// #### List

	// return list of all tasks for one projet
	list: function list(req, res) {

		Task.find({_project: req.params.projectId}).populate('_importance','name').populate('_category','name')
		.populate('users','firstName lastName').exec(function(err, tasks) {
			if (err) console.log(err);
			return res.json(tasks);
		});	
	},

	// #### Read

	// return all details for one task and his comments
	read: function read(req, res) {
		Task.findOne({id: req.params.id}).populate('_importance','name id').populate('_category','name id')
		.populate('users','firstName lastName').exec(function(err, task) {
			if (err) console.log(err);
			return res.json(task);
		});
	},

	// #### Create

	// store task into database and return flash message
	create: function add(req, res) {

		var task = new Task(req.body);
		var newId = 0;
		
		// get id for project
		 Task.findOne().sort({'id': -1}).limit(1).findOne(function(err,ta) {
		 	if (ta === null) { task.id = 0; }
		 	else {
	            var newId = parseInt(ta.id) + 1;
	            task.id = newId;
	        }

			task._creator = req.session.user.id;
			task._project = req.body.projectId;
			task.progress = 0;

			if(req.body.usersadd != null) {

				// add users into tasks 
				for (var i = 0; i < req.body.usersadd.length; i++) {
					var split = req.body.usersadd[i].split(' ');
					User.findOne().where('firstName').equals(split[0]).where('lastName').equals(split[1]).exec(function(err, usr) {
						if (err) { console.log(err); }
						task.users.push(usr);
					});
				}
			}

			
			// get importance
			Importance.findOne({id: req.body.importance }, function(err, imp) {
				if (imp != null) {
					task._importance = imp._id;
				}

				Category.findOne({id: req.body.category}, function(err, cat) {
					if (cat != null) {
						task._category = cat._id;
					}

					// save task
					task.save(function(err, t) {
						if (err) {
							console.log(err);
							return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
						}
						else {

							// save task into project's list
							Project.findOne({'id': req.body.projectId}, function(err, pro){
								if (err) return handleError(err);

								pro.tasks.push(t);
								pro.save(function(err, pr) {
									if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });

										// add into logs
										var log = new Log({'name': t.name,'_creator': req.session.user._id, '_project': pro._id});
										LogApi.create(log, 0);
										return res.json({'flash': 'Vous venez d\'ajouté la tache ' + t.name});
								});
							});
						}
					});
				});
			});
		});
	},

	// #### Edit

	// edit task information into database and return flash message
	edit: function edit(req, res) {

        Task.findOne({id: req.params.id}, function(err, ta) {
        	ta.name = req.body.name;
        	ta.description = req.body.description;
        	ta.dateStart = req.body.dateStart;
        	ta.dateEnd = req.body.dateEnd;
        	ta.progress = req.body.progress;

        	ta.users = new Array();

        	console.log(req.body);

        	if(req.body.usersadd != null) {

	        	// add users into tasks 
				for (var i = 0; i < req.body.usersadd.length; i++) {
					var split = req.body.usersadd[i].split(' ');
					User.findOne().where('firstName').equals(split[0]).where('lastName').equals(split[1]).exec(function(err, usr) {
						if (err) { console.log(err); }
						ta.users.push(usr);
					});
				}
			}

        	Importance.findOne({id: req.body.importance}, function(err, i) {
        		if (i != null) {
        			ta._importance = i._id;
        		}

        		Category.findOne({id: req.body.category}, function(err, cat) {
					if (cat != null) {
						ta._category = cat._id;
					}

		            ta.save(function (err, taS) {

		            	console.log(taS);
		            	if (err) {
		            		return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
		            	}
		            	else {
			            	if (taS.progress == 100) {	

			            		//find Importane name
			            		Importance.findOne({id: req.body.importance}, function(err, imp) {
			            			if(err) console.log(err);

			            			// search if log already exist
				            		Log.findOne({'name' : ta.name, '_logmessage': imp._id}).exec(function(err, log) {

				            			if (log == null) {

						            		// add into logs
						            		Project.findOne({id: ta._project}, function(err, pro) {
												var log = new Log({'name': ta.name,'_creator': req.session.user._id, '_project': pro._id});
												LogApi.create(log, 3);
						            		});
						            	}
				            		});
			            		});

			            	}else {

			            		// add into logs
			            		Project.findOne({id: ta._project}, function(err, pro) {
									var log = new Log({'name': ta.name,'_creator': req.session.user._id, '_project': pro._id});
									LogApi.create(log, 1);
			            		});
			            	}
			            }
		            });

		            return res.json({'flash': 'Votre tache a bien été modifié'});
				});
        	})
        });
	},

	// #### Delete

	// remove task into database and return flash message
	delete: function remove(req, res) {

		//find task
		Task.findOne(req.params.id, function(err, ta) {

			//find project for get his _id
			Project.findOne({id: ta._project}, function(err, pro) {

				// add into logs
				var log = new Log({'name': ta.name,'_creator': req.session.user._id, '_project': pro._id});
				LogApi.create(log, 2);

				// remove task
				ta.remove(function(err) {
					if (err) console.log(err);

						res.json({'flash': 'Votre tache a été supprimé'});
				});
			});
		});
	},
};

module.exports = tasks;