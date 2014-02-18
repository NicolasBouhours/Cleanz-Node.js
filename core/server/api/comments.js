// # Cleanz Data API
// Provides access to the data model for comments

// ## Dependencies
var mongoose = require('mongoose');
var User = require('../models/users');
var Task = require('../models/tasks');
var Comment = require('../models/comments');

// ## Tasks 
comments = {

	// #### Create

	// store comment into database and return flash message
	create: function add(req, res) {

		var comment = new Comment(req.body);

		// get id for comment
		 Comment.findOne().sort({'id': -1}).limit(1).findOne(function(err,com) {
		 	if (pr === null) { comment.id = 0; }
		 	else {
	            var newId = parseInt(com.id) + 1;
	            comment.id = newId;
	        }

	        // save comment to database
	        comment.save(function(err,c) {

	        	// add it to task comment's list
	        	Task.find({id: req.body.projectId}, function(err, t) {
	        		if (err) console.log(err);
	        		t.comments.push(c);

	        		// save task
	        		t.save(function(err) {
	        			if (err) console.log(err);
	        			return res.json({'flash'} : 'Votre commentaire a bien été ajouté');
	        		});
	        	});
	        });

	    });

	},

	// #### Edit

	// edit comment information into database and return flash message
	edit: function edit(req, res) {

		Comment.findOne({id: req.params.id}, function(err, com) {
			if (err) console.log(err);
			com.description = req.body.description;

			com.save(function(err,co){
				if (err) console.log(err);
				return res.json({'flash': 'Votre commentaire été modifié'});
			});
		});
	},

	// #### Delete

	// remove comment into database and return flash message
	delete: function remove(req, res) {
		Comment.find({id: req.params.id}, function(err, com) {
			if (err) console.log(err);
			com.remove();
			return res.json({'flash': 'Votre commentaire a été supprimé'});
		});
	},
};

module.exports = comments;