// ## Middleware Dependencies
var User = require('../models/users');
var Project = require('../models/projects');

// ## Middleware for app security
security = {

	checkUserProject: function(req, res, next) {
			Project.findOne({id: req.params.projectId}).populate({path: 'users', match: {_id: req.session.user._id}, select: '_id'}).exec(function(err, pro) {

			// if user belong to this project
			if (pro.users[0] == null) {
				return res.send(403, {'flash': pro });
			}

			next();
		});
	},
};

// ## Exports security middleware
module.exports = security;