// ## Module dependencies
var mongoose = require('mongoose');
var User = require('../models/users');

// ## Posts
users = {
    /// #### List
    list: function list(req,res) {
        // returns list of all users
        User.find(function(err, users) {
            return res.json(users);
        });
    },


    /// #### Read
    read: function read(args) {
        // **returns:** a promise for a single post in a json object

        return dataProvider.Post.findOne(args).then(function (result) {
            var omitted;

            if (result) {
                omitted = result.toJSON();
                omitted.author = _.omit(omitted.author, filteredUserAttributes);
                omitted.user = _.omit(omitted.user, filteredUserAttributes);
                return omitted;
            }
            return when.reject({errorCode: 404, message: 'Post not found'});

        });
    },


    // #### Edit

    // **takes:** a json object with all the properties which should be updated
    edit: function edit(postData) {
        // **returns:** a promise for the resulting post in a json object
        if (!this.user) {
            return when.reject({errorCode: 403, message: 'You do not have permission to edit this post.'});
        }
        var self = this;
        return canThis(self.user).edit.post(postData.id).then(function () {
            return dataProvider.Post.edit(postData).then(function (result) {
                if (result) {
                    var omitted = result.toJSON();
                    omitted.author = _.omit(omitted.author, filteredUserAttributes);
                    omitted.user = _.omit(omitted.user, filteredUserAttributes);
                    return omitted;
                }
                return when.reject({errorCode: 404, message: 'Post not found'});
            }).otherwise(function (error) {
                return dataProvider.Post.findOne({id: postData.id, status: 'all'}).then(function (result) {
                    if (!result) {
                        return when.reject({errorCode: 404, message: 'Post not found'});
                    }
                    return when.reject({message: error.message});
                });
            });
        }, function () {
            return when.reject({errorCode: 403, message: 'You do not have permission to edit this post.'});
        });
    },

    // #### Create

    // **takes:** a json object representing a post,
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