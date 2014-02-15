// Route for User Management

var api = require('../api');
var auth = require('../controllers')

module.exports = function(server) {

	// Route for users
	 server.get('/cleanz/api/users/list', api.users.list);
	/*server.get('cleanz/api/users/:id', api.users.read);
	server.post('cleanz/api/users/:id', api.users.edit);
	server.del('cleanz/api/users/:id', api.users.delete);

	// Route for sessions
	server.get('cleanz/login', auth.authController.login);
	server.get('cleanz/logout', auth.authController.logout);
*/
};