// # Cleanz Data API
// Provides access to the data model for meetings

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');
var Meeting = require('../models/meetings');
var Log = require('../models/logs');
var Category = require('../models/categories');
var LogApi = require('../api/logs');

// ## Meetings
meetings = {

	// #### List

	// return list of all meetings for one projet
	list: function list(req, res) {

		//get prokect
		Project.findOne({id: req.params.projectId}, function(err, pro) {

			//get meetings
			Meeting.find({_project: pro._id}).populate('_category','name').exec(function(err, meetings) {
				if (err) console.log(err);
				return res.json(meetings);
			});	
		});
	},

	// #### Read

	// return all details for one meeting
	read: function read(req, res) {
		Meeting.findOne({id: req.params.id}).populate('_category','name id').exec(function(err, meeting) {
			if (err) console.log(err);
			return res.json(meeting);
		});
	},

	// #### Create

	// store meeting into database and return flash message
	create: function add(req, res) {
		var meeting = new Meeting(req.body);
		var newId = 0;

		// get id for meeting
		 Meeting.findOne().sort({'id': -1}).limit(1).findOne(function(err,me) {
		 	if (me === null) { id = 0; console.log('me vaut null'); }
		 	else {
	             newId = (parseInt(me.id) + 1);
	        }
	    });
		// attribute info to meeting
		meeting._creator = req.session.user._id;
		meeting.id = newId;

		// get project
		Project.findOne({'id': req.body.projectId}, function(err, pro){
			if (err) return console.log(err);
			meeting._project = pro._id;

			Category.findOne({id: req.body.category}, function(err, cat) {
				if (cat != null) {
					meeting._category = cat._id;
				}

				// save meeting
				console.log(meeting);
				meeting.save(function(err, me) {
					console.log(req.body);
					console.log(err);
					if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });

					// add into logs
					var log = new Log({'name': me.name,'_creator': req.session.user._id, '_project': pro._id});
					LogApi.create(log, 4);

					// save task into project's list
					pro.meetings.push(me);
					pro.save(function(err, pr) {
						if (err) console.log(err);
							return res.json({'flash': 'Vous venez d\'ajouté la réunion ' + me.name});
					});
				});
			});
		});

	},

	// #### Edit

	// edit meeting information into database and return flash message
	edit: function edit(req, res) {

        Meeting.findOne(req.params.id, function(err, me) {
        	me.name = req.body.name;
        	me.description = req.body.description;
        	me.dateStart = req.body.dateStart;
        	me.timeStart = req.body.timeStart;
        	me.duree = req.body.duree;

        	Category.findOne({id: req.body.category}, function(err, cat) {
				if (cat != null) {
					me._category = cat._id;
				}

	        	// save meeting
	            me.save(function (err, meet) {
	            	if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
		        	 // add into logs
					var log = new Log({'name': meet.name,'_creator': req.session.user._id, '_project': meet._project});
					LogApi.create(log, 5);

	                res.json({'flash': 'Votre réunion a bien été modifié'});
	            });
	        });
        });
	},

	// #### Delete

	// remove meeting into database and return flash message
	delete: function remove(req, res) {

		Meeting.findOne({id: req.params.id}, function(err, me) {

			// si c'est le createur
			if (me._creator == req.session.user._id) {
				// add into logs
				var log = new Log({'name': me.name,'_creator': req.session.user._id, '_project': me._project});
				LogApi.create(log, 6);

				// remove it
				me.remove();

				//return flash message
				return res.json({'flash': 'Votre réunion a été supprimé'});
			}
			else {
				return res.json({'flash': 'Seul le créateur du bug a le droit de la supprimer'});
			}
		});
	},
};

module.exports = meetings;