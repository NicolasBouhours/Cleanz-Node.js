// # Cleanz Data API
// Provides access to the data model

var users 			= require('./users'),
	projects 		= require('./projects'),
	invits 			= require('./invits'),
	tasks 			= require('./tasks'),
	comments		= require('./comments'),
	bugs 			= require('./bugs'),
    logs            = require('./logs');


// ## Public API
module.exports = {
    users: users,
    projects: projects,
    invits: invits,
    tasks: tasks,
    comments: comments,
    bugs: bugs,
    logs: logs,
};
