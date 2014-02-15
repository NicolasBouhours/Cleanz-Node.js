// ## Module dependencies
var mongoose = require('mongoose');
var User = require('../models/users');

// ## Posts
users = {

    // #### List
    list: function list(req,res) {
        // returns list of all users
        User.find(function(err, users) {
            return res.json(users);
        });
    },


    // #### Read
    read: function read(req,res, id) {
        return res.json(req.session.user);
    },


    // #### Edit

    // edit one user into database and return flash message
    edit: function edit(req, res) {

    },

    // #### Create

    // insert user into database and return flash message
    create: function add(req, res) {
        var user = new User(req.body);
            User.findOne().sort({'_id': -1}).limit(1).findOne(function(err,usr) {
                var newId = parseInt(usr.id) + 1;
                user._id = newId;
                user.save(function(err){
                    if (err) { res.json({'flash': 'Nous n\'avons pas pu enregistrer votre utilisateur'}); }
                    res.json({'flash': 'Votre utilisateur a été crée avec succès.'});
                });
        });

    },

};

module.exports = users;