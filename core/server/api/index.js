// # Cleanz Data API
// Provides access to the data model

var users 			= require('./users'),
	projects 		= require('./projects'),
	invits 			= require('./invits'),
	tasks 			= require('./tasks');


// ## Public API
module.exports = {
    users: users,
    projects: projects,
    invits: invits,
    tasks: tasks,
};
