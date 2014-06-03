// # Cleanz Data API
// Provides access to the data model for categories

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Project = require('../models/projects');
var Category = require('../models/categories');


// ## Categories
categories = {

	// #### List

	// return list of all projects for one user
	list: function list(req, res) {

		//get project
		Project.findOne({id: req.params.projectId}, function(err, pro) {

			//get category
			Category.find({_project: pro._id}).exec(function(err, cats) {
				if (err) console.log(err);
				return res.json(cats);
			});	
		});
	},
	// #### Create

	// create project to database and return flash message
    create: function add(req, res) {
    	var category = new Category(req.body);

    	// check if this category doesn't exist
    	Category.findOne({'name': req.body.name}, function(err, cat) {
    		console.log(cat);
    		if (cat != null) {
    			return res.json({'flash': 'Cette catégorie existe déja'});
    		}
    		else {

	    	// get id for category
			 Category.findOne().sort({'id': -1}).limit(1).findOne(function(err,cat) {
			 	if(err) console.log(err);
			 	if (cat === null) { category.id = 0; }
			 	else {
		            var newId = parseInt(cat.id) + 1;
		            category.id = newId;
		        }

				//Find project
				Project.findOne({id: req.body.projectId}).exec(function(err, pro) {

					category._project = pro._id;

	        		if (err) console.log(err);

	        		//save category
					category.save(function(err, cat) {
						if (err) {
							return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
						}
						else {
							pro.categories.push(cat);

							pro.save(function(err) {
								if (err) console.log(err);

								return res.json({'flash': 'Vous venez d\'ajouté la catégorie ' + cat.name});
							});
						}
					});
				});
			});
		    }
    	});
	},

	// #### Edit

	// edit information to database and return flash message
	edit: function edit(req, res) {

		// check if this category doesn't exist
    	Category.findOne({'name': req.body.name}, function(err, cat) {

    		if (cat != null) {
    			return res.json({'flash': 'Cette catégorie existe déja'});
    		}
    		else {



			//find category
			Category.findOne(req.params.id, function(err, cat) {
				if (err) console.log(err);

				cat.name = req.body.name;

				//save it
				cat.save(function(err) {
					if (err) {
						return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
					}
					else {
						return res.json({'flash': 'La catégorie a été modifié avec succès'});
					}
				});
			});
		   	}
    	});
	},

	// #### Delete

	// delete project into database
	delete: function remove(req, res) {

		//find catefory
		Category.findOne(req.params.id, function(err, cat) {
			if (err) console.log(err);
			// delete category
			if (cat != null) {
				cat.remove();
			}
			return res.json({'flash':'La catégorie a été supprimée'});
		});
	},

};

module.exports = categories;