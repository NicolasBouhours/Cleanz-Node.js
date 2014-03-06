// ## Middleware Dependencies
var User = require('../models/users');
var Project = require('../models/projects');

// ## Middleware for app security
security = {

	checkUserProject: function(req, res) {
		console.log('jesuisentre');
		console.log(req.params);
			Project.findOne({id: req.params.id}).exec(function(err, pro) {
				console.log(pro);
			// if user belong to this project
			if (pro != null) {
				return res.json({'flash': 'L\'utilisateur appartient au projet'});
			}
			else {
				res.send(403, {'flash': 'TA PAS LE DROIT MAN' });
			}
		});
	},
};

// ## Exports security middleware
module.exports = security;