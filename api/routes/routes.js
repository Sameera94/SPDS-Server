'use strict';

module.exports = function(app) {
	
    var todoList = require('../controllers/todoListController');
    var user     = require('../controllers/userController');
	var ridder   = require('../controllers/ridderController');
	var order	 = require('../controllers/orderController')

	/*
		// todoList Routes
		app.route('/tasks')
			.get(todoList.list_all_tasks)
			.post(todoList.create_a_task);

		app.route('/tasks/:taskId')
			.get(todoList.read_a_task)
			.put(todoList.update_a_task)
			.delete(todoList.delete_a_task);
	
    	app.route('/user')
        	.get(user.list_all_users)
        	.post(user.create_a_user);
	*/

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
	
	app.route('/getAllOrders')
		.post(order.getAllOrders)


};
