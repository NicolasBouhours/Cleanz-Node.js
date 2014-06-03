// ## Module dependencies
var mongoose = require('mongoose');
var User = require('../models/users');

// ## Authentification

authController = {

	// #### Login
	login: function login(req, res) {
		req.session.user = null;
		User.findOne({ email: req.body.email, password: req.body.password}, function(err,usr) {
			if (usr != null) {
				req.session.user = usr;
				return res.json({ 'flash': req.session.user});
			}
			else {
				res.send(500, {'flash': 'Mauvais identifiants' });
			}
		});

	},

	// #### Logout
	logout: function logout(req, res) {
		console.log('Vous etes deconnecté');
		req.session.destroy();
		return res.json({'flash': 'Vous êtes deconnecté'});
	},
};

module.exports = authController;