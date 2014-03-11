// # Cleanz Data API 
// Provides access to the data model for bugs

// ## Dependencies
var mongoose = require('mongoose');
var Log = require('../models/logs');
var Project = require('../models/projects');
var LogMessages = require('../models/logsmessages');

// ## Logs 
logs = {

	// ## List

	// return list of logs
	list: function list(req, res) {

		// get project
		Project.findOne({id: req.params.projectId}, function(err, pro) {
			if (err) console.log(err);
			// get logs
			Log.find({_project: pro._id}).populate('_creator', 'id firstName lastName').populate('_logmessage').exec(function(err, logs) {
				if (err) console.log(err);
				return res.json(logs);
			});
		});
	},

	create: function add(log, logMes) {

		// get id for logs
		Log.findOne().sort({'id': -1}).limit(1).findOne(function(err,lo) {
		 	if (lo === null) { log.id = 0; }
		 	else {
	            var newId = parseInt(lo.id) + 1;
	            log.id = newId;
	        }

	        // get logs messages
	        LogMessages.findOne({id: logMes}, function(err, logM) {
	        	log._logmessage = logM._id;

	        	//save logs
				log.save(function(err, l) {
					if (err) console.log(err);

					// add logs into projects log's list
					Project.findOne({_id: log._project}, function(err, pro) {
						if (err) console.log(err);
						console.log(pro);
						pro.logs.push(l);

						pro.save(function(err,p) {
							if (err) console.log(err);
						});
					});
				});
	        });
	    });
	},
};

// ## Export logs
module.exports = logs;