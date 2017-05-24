'use strict';

var mongoose = require('mongoose');

exports.checkRidderAvailability = function(req, res) {

	// TODO: GET Ridder ID from DB

	res.status(200).send({
		status: true,
		ridderId: 1
	})


	// req.body.diliveryFrom
	// req.body.diliveryTo
	// req.body.deliveryOn
	// req.body.fromLat
	// req.body.fromLng
	// req.body.toLat
	// req.body.toLng
	// req.body.fromArea
	// req.body.toArea


}
