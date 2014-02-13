// Module dependencies
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');

/*
var init = function() {

	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(require('stylus').middleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	app.get('/', routes.index);
	app.get('/users', user.list);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

}
*/


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
	server.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == server.get('env')) {
	  server.use(express.errorHandler());
	}

	// Include routes
	routes.api(server);
	routes.auth(server);

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
