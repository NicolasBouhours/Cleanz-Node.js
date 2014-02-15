// ## Module dependencies
var mongoose = require('mongoose');
var User = require('../models/users');

// ## Posts
users = {

    // #### List

    // returns list of all users
    list: function list(req,res) {
        User.find(function(err, users) {
            return res.json(users);
        });
    },


    // #### Read

    // return user information to json
    read: function read(req,res, id) {
        User.findOne(req.session.user._id, function(err,usr) {
            if (err) return res.json({'flash': 'Impossible d\'afficher vos informations'});
            return res.json(usr);
        });
    },


    // #### Edit

    // edit one user into database and return flash message
    edit: function edit(req, res) {
        var newU = new User(req.body);
        console.log(newU);
        console.log("--------------------------------------------");

        User.findOne(req.session.user._id, function(err, usr) {
            console.log(usr);
            usr.firstName = newU.firstName;
            usr.lastName = newU.lastName;
            usr.phone = newU.phone;

            usr.save(function (err, usrS) {
                if (err) { return res.json({'flash': err}); }
                res.json({'flash': 'Vos informations personnelles ont bien été modifiés'});
            });
        });

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