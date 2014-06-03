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
        User.findOne({id:req.session.user.id}, function(err,usr) {
            if (err) return res.json({'flash': 'Impossible d\'afficher vos informations'});
            return res.json(usr);
        });
    },


    // #### Edit

    // edit one user into database and return flash message
    edit: function edit(req, res) {
        var newU = new User(req.body);

        // update firstName, lastName and phone and save it to database
        User.findOne(req.session.user._id, function(err, usr) {
            usr.firstName = newU.firstName;
            usr.lastName = newU.lastName;
            usr.phone = newU.phone;

            usr.save(function (err, usrS) {
                if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
                res.json({'flash': 'Vos informations personnelles ont bien été modifiés'});
                req.session.user = usrS;
            });
        });

    },

    // #### Edit Password

    //edit user password and return flash message
    editPassword: function editPassword(req,res) {

        var oldPw = req.body.oldPassword;
        var newPw = req.body.password1;
        var newPw2 = req.body.password2

        //verify if two new password are the same
        if (newPw != newPw2) {
            return res.json({'flash': 'Veuillez entrer deux mots de passes identiques'});
        }
        else {
            User.findOne(req.session.user._id, function(err, usr) {
                // verify if old password is good
                if (oldPw != usr.password) {
                    return res.json({'flash': 'Votre ancien mot de passe n\'est pas correct'});
                }
                else {
                    usr.password = newPw;
                    usr.save(function (err, usrS) {
                        if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
                        res.json({'flash': 'Vos mot de passe a été modifié avec succès'});
                    });
                }
            });
        }
    },

    // #### Create

    // insert user into database and return flash message
    create: function add(req, res) {
        var user = new User(req.body);

        User.findOne().sort({'id': -1}).limit(1).findOne(function(err,usr) {
            if (usr === null) { user.id = 0; }
            else {
                var newId = parseInt(usr.id) + 1;
                user.id = newId;
            }

            User.findOne({email: user.email}, function(err, usr) {
                if (usr === null) {
                    user.save(function(err){
                        if (err) return res.send(500, {'flash': 'Veuillez rentrer des informations correctes' });
                        return res.json({'flash': 'Votre utilisateur a été crée avec succès.'});
                     });
                 }
                else {
                    return res.json({'flash': 'Un utilisateur utilise déja cet email' });
                }
            });
        });
    },

    // #### Delete

    // delete user to database and return flash message
    delete: function remove(req, res) {
        User.findOne(req.session._id).remove();
        req.session.destroy();

        return res.json({'flash': 'Votre compte a été supprimé avec succès'});
    },

};

module.exports = users;