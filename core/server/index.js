// Module dependencies
var express = require('express');
var routes = require('./routes');
var models = require('./models');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var mongoose = require('mongoose');

function setup(server) {

	// Configure express for working with Handlebar
	server.engine('hbs', hbs.express3({
	  partialsDir: __dirname + '/views'
	}));

	// Configure server
	server.set('port', process.env.PORT || 3000);
	server.set('views', path.join(__dirname, 'views'));
	server.set('view engine', 'hbs');
	server.use(express.favicon());
	server.use(express.logger('dev'));
	server.use(express.json());
	server.use(express.urlencoded());
	server.use(express.methodOverride());
	server.use(server.router);
	server.use(express.static(path.join(__dirname, '../client')));

	// development only
	if ('development' == server.get('env')) {
	  server.use(express.errorHandler());
	}

	// Include routes
	routes.api(server);
	routes.auth(server);

	// Connect app to Mongoose Databse
	mongoose.connect('mongodb://localhost/cleanz', function(err) {
		if (err) { throw err; }
	});

	// Test mongoose Finish
	http.createServer(server).listen(server.get('port'), function(){
	  console.log('Express server listening on port ' + server.get('port'));
	});
}

 
// Initializes the ghost application.
function init(app) {
    if (!app) {
        app = express();
    }

    // The server and its dependencies require a populated config
    setup(app);
}

module.exports = init;
