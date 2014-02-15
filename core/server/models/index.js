// ## Get all models
var users 			= require('./users'),
	bugs 			=  require('./bugs'),
	comments		= require('./comments'),
	documents		= require('./documents'),
	dutys 			= require('./dutys'),
	logs 			= require('./logs'),
	logsmessages	= require('./logsmessages'),
	meetings		= require('./meetings'),
	messages 		= require('./messages'),
	projects 		= require('./projects'),
	tasks 			= require('./tasks'),
	importances		= require('./importances');

// ## Export all models
module.exports = {
    user: users,
    bug: bugs,
    comment: comments,
    document: documents,
    duty: dutys,
    log: logs,
    logsmessage: logsmessages,
    meeting: meetings,
    message: messages,
    project: projects,
    task: tasks,
    importance: importances,
};
