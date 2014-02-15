// Routes for our api

var api = require('../api');
var mongoose = require('mongoose');
var User = require('../models/users');

module.exports = function(server) {

	// Page Launch
	server.get('/', function(req,res) {
	/*	User.findOne().sort({'_id': -1}).limit(1).findOne(function(err,usr) {
			var newId = parseInt(usr.id) + 1;
			var u = new User({_id: newId,firstName:'Martin', lastName:'Dazin', password:'mart49', email:'m.dazin@iia-laval.fr', phone:'0663636514'});
			u.save(function(err){
				console.log(err);
			});

		});*/
		  res.render('index', { title: 'Express Node.Js' });
	});
	server.post('/cleanz/api/users/add', api.users.create);
/*
	// Route for Project
	server.get('cleanz/api/projects/list', api.projects.list);
	server.det('cleanz/api/projects/:id', api.projects.delete);
	server.post('cleanz/api/projects/add', api.projects.create);
	server.post('cleanz/api/project/addUser', api.projects.addUser);
	server.del('cleanz/api/project/delUser', api.projects.delUser);
	
	// Route for Tasks
	server.get('cleanz/api/tasks/list', api.tasks.list);
	server.post('cleanz/api/tasks/add', api.tasks.create);
	server.get('cleanz/api/tasks/:id', api.tasks.read);
	server.put('cleanz/api/tasks/:id', api.tasks.edit);
	server.del('cleanz/api/tasks/:id', api.tasks.delete);

	// Route for Meetings
	server.get('cleanz/api/meetings/list', api.meetings.list);
	server.post('cleanz/api/meetings/add', api.meetings.create);
	server.get('cleanz/api/meetings/:id', api.meetings.read);
	server.put('cleanz/api/meetings/:id', api.meetings.edit);
	server.del('cleanz/api/meetings/:id', api.meetings.delete);

	// Route for Comments
	server.post('cleanz/api/comments/add', api.comments.create);
	server.get('cleanz/api/comments/list', api.comments.list);

	// Route for Invits
	server.get('cleanz/api/invits/list', api.invits.list);
	server.put('cleanz/api/invits/:id', api.invits.accept);
	server.del('cleanz/api/invits/id', api.invits.refuse);

	// Route for Bugs
	server.get('cleanz/api/bugs/list', api.bugs.list);
	server.post('cleanz/api/bugs/add', api.bugs.create);
	server.get('cleanz/api/bugs/:id', api.bugs.read);
	server.put('cleanz/api/bugs/:id', api.bugs.edit);
	server.del('cleanz/api/bugs/:id', api.bugs.delete);

	// Route for Logs
	server.get('cleanz/api/logs/list', api.logs.list);
	*/

};