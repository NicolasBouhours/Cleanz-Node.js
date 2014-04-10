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
var mime = require('mime');

// ## Documents 
documents = {

	// #### List

	// get list of all document 
	list: function list(req, res) {

		// get all documents
		Project.findOne({id: req.params.projectId}, function(err, pro) {
			if (err) console.log(err);
			
			Document.find({_project: pro._id}).populate('_creator','_id firstName lastName').exec(function(err, docs) {
				return res.json(docs);
			});
		});
	},

	// #### Read

	// return information about our document
	read: function read(req, res) {

		Document.findOne({id: req.params.id}, function(err, doc) {
			return res.json(doc);
		});
	},

	// #### Download file

	//send file to user when he want download him
	download: function download(req, res) {

			console.log(req.params.id);
		// get document
		Document.findOne({id: req.params.projectId}, function(err, doc) {
			if (err) console.log(err);

			// get project
			Project.findOne({_id: doc._project}, function(err, pro) {
				if (err) console.log(err);
				var file = 'C:/Users/Nico/Desktop/Cleanz/content/' + pro.id + '/' + doc.name;
				res.download(file);
			});
		});

	},

	// #### Create

	// store document into database and return flash message
	create: function add(req, res) {

		// find project
		Project.findOne({id: req.params.id}, function(err, pro) {
			if (err) console.log(err);

			var doc = new Document({'name': req.files.file.name, 'size': req.files.file.size, 'type': req.files.file.type,
			 '_creator': req.session.user._id, '_project': pro._id, 'description': req.query.descr});

			// get id
			Document.findOne().sort({'id': -1}).limit(1).findOne(function(err,docu) {
			 	if (docu === null) { doc.id = 0; }
			 	else {
		            var newId = parseInt(docu.id) + 1;
		            doc.id = newId;
		        }
		        
				var path_temp = req.files.file.path;
				var target_path = 'C:/Users/Nico/Desktop/Cleanz/content/' + pro.id + '/' + doc.name;
				target_foler = 'C:/Users/Nico/Desktop/Cleanz/content/' + pro.id;
				console.log(target_path);
				fs.exists(target_foler, function(exists) {
					if (exists) console.log('dossier ok');
					else {
						fs.mkdir(target_foler);
					}
				});


				fs.exists(target_path, function(exists) {
					if (exists) return res.json({'flash': 'Ce fichier existe déja'});
				});

				// save document into database
				doc.save(function(err, d) {
					if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
					else {

						// store document
						fs.rename(path_temp, target_path, function(err) {
							if (err) throw err;

							fs.unlink(path_temp, function() {
								if (err) throw err;
								return res.json({'flash': ' Votre fichier a été ajouté.'});
							});
						});

						pro.documents.push(d);
						pro.save();

						// add into logs
						var log = new Log({'name': d.name,'_creator': req.session.user._id, '_project': d._project});
						LogApi.create(log, 7);

						return res.json({'flash': 'Votre document a été ajouté'});
					}
				});
			});
		});
	},

	// #### Edit

	// edit comment information into database and return flash message
	edit: function edit(req, res) {
		console.log(req.body);
		//find document
		Document.findOne({id: req.params.id}, function(err, doc) {
			if (err) console.log(err);

			//dinc document
			Project.findOne({_id: doc._project}, function(err, pro) {

				doc.description = req.body.description;

				//if user change name
				if (doc.name != req.body.name) {
	

					var target_pathBase = 'C:/Users/Nico/Desktop/Cleanz/content/' + pro.id + '/' + doc.name;
					var target_path = 'C:/Users/Nico/Desktop/Cleanz/content/' + pro.id + '/' + req.body.name;
					doc.name = req.body.name;
					//rename file
					fs.exists(target_path, function(exists) {
						if (exists) return res.json({'flash': 'Ce fichier existe déja.'});
						else {
							fs.rename(target_pathBase, target_path, function(err) {
								if (err) console.log(err);
								
							});
						}
					});
				}

				// save changes into database
				doc.save(function(err, d) {
					if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });

					// add into logs
					var log = new Log({'name': d.name,'_creator': req.session.user._id, '_project': d._project});
					LogApi.create(log, 8);

					return res.json({'flash': 'Votre document a été modifié'});
				});
			});
		});
	},

	// #### Delete

	// remove comment into database and return flash message
	delete: function remove(req, res) {

		//find document
		Document.findOne({id: req.params.id}, function(err, doc) {

			//find project
			Project.findOne({_id: doc._project}, function(err, pro) {

				var target_path = 'C:/Users/Nico/Desktop/Cleanz/content/' + pro.id + '/' + doc.name;

				// add into logs
				var log = new Log({'name': doc.name,'_creator': req.session.user._id, '_project': doc._project});
				LogApi.create(log, 9);
				
				doc.remove();

				fs.unlink(target_path, function(err) {
					if (err) console.log(err);
					return res.json({'flash': 'Votre document a été supprimé'});
				});
			});
		});
	},
};

module.exports = documents;