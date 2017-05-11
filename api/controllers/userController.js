'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
            res.json(user);
        });
};

exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
}; 

exports.validateUserLogin = function(req, res) {

    if (req.body.username == "user" && req.body.password == "user") {
        res.status(200).send(true)    
    } else {
        res.status(200).send(false)
    }
}