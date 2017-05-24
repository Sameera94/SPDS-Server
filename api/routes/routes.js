'use strict';

module.exports = function(app) {
	
    var todoList = require('../controllers/todoListController');
    var user     = require('../controllers/userController');
	var ridder   = require('../controllers/ridderController');
	var order	 = require('../controllers/orderController')

    // login routes
    app.route('/login')
        .post(user.validateUserLogin);
        
	// create new user
	app.route('/createNewUser')
		.post(user.createNewUser)

	// Check ridder availalbolity
	app.route('/checkRidderAvailability')
		.post(ridder.checkRidderAvailability)

	// Make an order
	app.route('/createNewOrder')
		.post(order.createNewOrder)
	
	app.route('/getAllNewOrders')
		.post(order.getAllNewOrders)

	app.route('/getAllOrdersDue')
		.post(order.getAllOrdersDue)

	app.route('/cancelOrder')
		.post(order.cancelOrder)

	app.route('/getAllOrdersDesktop')
		.post(order.getAllOrdersDesktop)

	app.route('/getAllRidders')
		.post(order.getAllRidders)
		

};
