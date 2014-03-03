// Route for User Management

var api = require('../api');
var auth = require('../controllers')

module.exports = function(server) {

	// ## Route for users
	server.get('/cleanz/api/users/list', api.users.list);
	server.post('/cleanz/api/users/add', api.users.create);
	server.get('/cleanz/api/users', api.users.read);
	server.put('/cleanz/api/users/editPassword', api.users.editPassword);
	server.put('/cleanz/api/users', api.users.edit);
  //	server.del('/cleanz/api/users', api.users.delete);

	// ## Route for sessions
	server.post('/cleanz/login', auth.authController.login);
	server.get('/cleanz/logout', auth.authController.logout);

	// ## Route for security
	server.get('/cleanz/security/:id', auth.securityController.checkUserProject);

};