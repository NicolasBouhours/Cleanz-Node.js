// Routes for our api

var api = require('../api');
var mongoose = require('mongoose');
var User = require('../models/users');
var Importance = require('../models/importances');

module.exports = function(server) {

	// Page Launch
	server.get('/', function(req,res) {
		  res.render('index', { title: 'Express Node.Js' });
	});

	// Route for Project
	server.get('/cleanz/api/projects/list', api.projects.list);
	//server.del('/cleanz/api/projects/:id', api.projects.delete);
	server.post('/cleanz/api/projects/add', api.projects.create);
	server.get('/cleanz/api/projects/:id', api.projects.read);
	server.post('/cleanz/api/project/addUser', api.projects.addUser);
	
	//server.del('/cleanz/api/project/delUser', api.projects.delUser);
	
	// Route for Tasks
	server.get('/cleanz/api/tasks/list/:id', api.tasks.list);
	server.get('/cleanz/api/tasks/:id', api.tasks.read);
	server.post('/cleanz/api/tasks/add', api.tasks.create);
	server.put('/cleanz/api/tasks/:id', api.tasks.edit);
	//server.del('/cleanz/api/tasks/:id', api.tasks.delete);

	// Route for Meetings
	//server.get('/cleanz/api/meetings/list/:id', api.meetings.list);
	//server.post('/cleanz/api/meetings/add', api.meetings.create);
	//server.get('/cleanz/api/meetings/:id', api.meetings.read);
	//server.put('/cleanz/api/meetings/:id', api.meetings.edit);
	//server.del('/cleanz/api/meetings/:id', api.meetings.delete);

	// Route for Comments
	//server.post('/cleanz/api/comments/add', api.comments.create);
	//server.get('/cleanz/api/comments/list/:id', api.comments.list);

	// Route for Invits
	server.get('/cleanz/api/invits/list', api.invits.list);
	server.put('/cleanz/api/invits/:id', api.invits.accept);
	server.del('/cleanz/api/invits/:id', api.invits.refuse);
/*
	// Route for Bugs
	server.get('/cleanz/api/bugs/list/:id', api.bugs.list);
	server.post('/cleanz/api/bugs/add', api.bugs.create);
	server.get('/cleanz/api/bugs/:id', api.bugs.read);
	server.put('/cleanz/api/bugs/:id', api.bugs.edit);
	server.del('/cleanz/api/bugs/:id', api.bugs.delete);

	// Route for Logs
	server.get('/cleanz/api/logs/list/:id', api.logs.list);
	*/

	server.get('/cleanz/init', function(req, res) {
		var imp0 = new Importance({id: 0, name: 'Basse'});
		var imp1 = new Importance({id: 1, name: 'Moyenne'});
		var imp2 = new Importance({id: 2, name: 'Haute'});
		var imp3 = new Importance({id: 3, name: 'Elevée'});

		imp0.save();
		imp1.save();
		imp2.save();
		imp3.save();

		return res.json({'flash': 'Base de donnée remplie'});
	});

};