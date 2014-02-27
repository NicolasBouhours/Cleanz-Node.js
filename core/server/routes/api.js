// Routes for our api

var api = require('../api');
var mongoose = require('mongoose');
var User = require('../models/users');
var Importance = require('../models/importances');
var LogMessage = require('../models/logsmessages');
var logs = require('../models/logs');

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

	// Route for Documents
	server.get('/cleanz/api/documents/list/:id', api.documents.list);
	server.post('/cleanz/api/documents/add/:id', api.documents.create);
	server.get('/cleanz/api/documents/get/:id', api.documents.download);
	server.get('/cleanz/api/documents/:id', api.documents.read);
	server.put('/cleanz/api/documents/:id', api.documents.edit);
	server.del('/cleanz/api/documents/:id', api.documents.delete);

	// Route for Tasks
	server.get('/cleanz/api/tasks/list/:id', api.tasks.list);
	server.get('/cleanz/api/tasks/:id', api.tasks.read);
	server.post('/cleanz/api/tasks/add', api.tasks.create);
	server.put('/cleanz/api/tasks/:id', api.tasks.edit);
	//server.del('/cleanz/api/tasks/:id', api.tasks.delete);

	// Route for Meetings
	server.get('/cleanz/api/meetings/list/:id', api.meetings.list);
	server.post('/cleanz/api/meetings/add', api.meetings.create);
	server.get('/cleanz/api/meetings/:id', api.meetings.read);
	server.put('/cleanz/api/meetings/:id', api.meetings.edit);
	server.del('/cleanz/api/meetings/:id', api.meetings.delete);

	// Route for Comments
	server.post('/cleanz/api/comments/add', api.comments.create);
	server.get('/cleanz/api/comments/list/:id', api.comments.list);

	// Route for Invits
	server.get('/cleanz/api/invits/list', api.invits.list);
	server.put('/cleanz/api/invits/:id', api.invits.accept);
	server.del('/cleanz/api/invits/:id', api.invits.refuse);

	// Route for Bugs
	server.get('/cleanz/api/bugs/list/:id', api.bugs.list);
	server.post('/cleanz/api/bugs/add', api.bugs.create);
	server.get('/cleanz/api/bugs/:id', api.bugs.read);
	server.put('/cleanz/api/bugs/:id', api.bugs.edit);
	server.del('/cleanz/api/bugs/:id', api.bugs.delete);

	// Route for Logs
	server.get('/cleanz/api/logs/list/:id', api.logs.list);
	

	server.get('/cleanz/init', function(req, res) {
		var imp0 = new Importance({id: 0, name: 'Basse'});
		var imp1 = new Importance({id: 1, name: 'Moyenne'});
		var imp2 = new Importance({id: 2, name: 'Haute'});
		var imp3 = new Importance({id: 3, name: 'Elevée'});

		imp0.save();
		imp1.save();
		imp2.save();
		imp3.save();

		var l1 = new LogMessage({id: 0, name: 'a crée la tache'});
		var l2 = new LogMessage({id: 1, name: 'a modifié la tache'});
		var l3 = new LogMessage({id: 2, name: 'a supprimé la tache'});
		var l4 = new LogMessage({id: 3, name: 'a terminé la tache'});
		var l5 = new LogMessage({id: 4, name: 'a ajouté la réunion'});
		var l6 = new LogMessage({id: 5, name: 'a modifié la réunion'});
		var l7 = new LogMessage({id: 6, name: 'a supprimé la réunion'});
		var l8 = new LogMessage({id: 7, name: 'a ajouté le document'});
		var l9 = new LogMessage({id: 8, name: 'a modifié le document'});
		var l10 = new LogMessage({id: 9, name: 'a supprimé le document'});
		var l11 = new LogMessage({id: 10, name: 'a ajouté le bug'});
		var l12 = new LogMessage({id: 11, name: 'a modifié le bug'});
		var l13 = new LogMessage({id: 12, name: 'a supprimé le bug'});
		var l14 = new LogMessage({id: 13, name: 'a ajouté la catégorie'});
		var l15 = new LogMessage({id: 14, name: 'a supprimé la catégorie'});
		var l16 = new LogMessage({id: 15, name: 'a rejoint le projet'});
		var l17 = new LogMessage({id: 16, name: 'a quitté le projet'});
		var l18 = new LogMessage({id: 17, name: 'a commenté la tache'});
		var l19 = new LogMessage({id: 18, name: 'a commenté le bug'});

		l1.save();
		l2.save();
		l3.save();
		l4.save();
		l5.save();
		l6.save();
		l7.save();
		l8.save();
		l9.save();
		l10.save();
		l11.save();
		l12.save();
		l13.save();
		l14.save();
		l15.save();
		l16.save();
		l17.save();
		l18.save();
		l19.save();


		return res.json({'flash': 'Base de donnée remplie'});
	});

};