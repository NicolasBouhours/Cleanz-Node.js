// # Cleanz Data API
// Provides access to the data model for documents

// ## Dependencies
var mongoose = require('mongoose');
var Log = require('../models/logs');
var LogApi = require('../api/logs');
var Document = require('../models/documents');
var Project = require('../models/projects');

// ## Dependencies for file
var fs = require('fs');
var path = require('path');

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
		console.log(req.files.file.name);
		console.log(req.files.file.size);
		console.log(req.files.file.type);

		// find project
		Project.findOne({id: req.params.id}, function(err, pro) {
			if (err) console.log(err);

			var doc = new Document({'name': req.files.file.name, 'size': req.files.file.size, 'type': req.files.file.type,
			 '_creator': req.session.user._id, '_project': pro._id});
					// get id for comment

			// get id
			Document.findOne().sort({'id': -1}).limit(1).findOne(function(err,docu) {
			 	if (docu === null) { doc.id = 0; }
			 	else {
		            var newId = parseInt(docu.id) + 1;
		            doc.id = newId;
		        }
		        
				var path_temp = req.files.file.path;
				var target_path = 'C:/Users/Nico/Desktop/Cleanz/content/' + doc.id;

				// store document
				fs.rename(path_temp, target_path, function(err) {
					if (err) throw err;

					fs.unlink(path_temp, function() {
						if (err) throw err;
						return res.json({'flash': ' Votre fichier a été ajouté.'});
					});
				});

				// save document into database
				doc.save(function(err) {
					if (err) console.log(err)
					else {
						return res.json({'flash': 'Votre document a été ajouté'});
					}
				});
			});
		});
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