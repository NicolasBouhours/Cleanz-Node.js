// # Cleanz Data API
// Provides access to the data model

var users = require('./users');
var projects = require('./projects');


// ## Public API
module.exports = {
    users: users,
    projects: projects,
};
