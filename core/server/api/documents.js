// # Cleanz Data API
// Provides access to the data model for documents

// ## Dependencies
var mongoose = require('mongoose');
var Log = require('../models/logs');
var LogApi = require('../api/logs');
var Document = require('../api/documents');

// ## Documents 
documents = {

	// #### List

	// get list of all document 
	list: function list(req, res) {

	},

	// #### Create

	// store document into database and return flash message
	create: function add(req, res) {
		console.log('welcome');
		console.log(req.files);

		return res.json({'flash': 'Votre document a été ajouté'});
	},

	// #### Edit

	// edit comment information into database and return flash message
	edit: function edit(req, res) {

	},

	// #### Delete

	// remove comment into database and return flash message
	delete: function remove(req, res) {

	},
};

module.exports = documents;