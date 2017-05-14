'use strict';

var mongoose = require('mongoose');

exports.checkRidderAvailability = function(req, res) {

    if (req.body.diliveryFrom == "Colombo" && req.body.diliveryTo == "Rathnapura") {
        res.status(200).send(true)
    } else {
        res.status(200).send(false)
    }
}
