// ## Module dependencies
var mongoose = require('mongoose');
var User = require('../models/users');

// ## Security

securityController = {

	// #### checkUserProject
	checkUserProject: function(req, res) {

		User.findOne({id: req.session.user.id}).populate('projects').where('projects.id', req.params.projectId).exec(function(err, pro) {

			// if user belong to this project
			if (pro != null) {
				return res.json({'flash': 'L\'utilisateur appartient au projet'});
			}
			else {
				res.send(500, {'flash': 'L\'utilisateur n\'appartient pas au projet' });
			}
		});
	},
};

module.exports = securityController;