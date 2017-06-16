'use strict';

module.exports = function(app) {
	
    var todoList = require('../controllers/todoListController');
    var user     = require('../controllers/userController');
	var ridder   = require('../controllers/ridderController');
	var order	 = require('../controllers/orderController');
	var student  = require('../controllers/studentController');
	var shoping  = require('../controllers/shopingController');

	// Smart Packge Delivery Routes

    app.route('/login').post(user.validateUserLogin);        
	app.route('/createNewUser').post(user.createNewUser);
	app.route('/checkRidderAvailability').post(ridder.checkRidderAvailability);
	app.route('/createNewOrder').post(order.createNewOrder);
	app.route('/getAllNewOrders').post(order.getAllNewOrders);
	app.route('/getAllOrdersDue').post(order.getAllOrdersDue);
	app.route('/cancelOrder').post(order.cancelOrder);
	app.route('/getAllOrdersDesktop').post(order.getAllOrdersDesktop);
	app.route('/getAllRidders').post(order.getAllRidders);
		
	// STD Routes
	app.route('/studentLogin').post(student.studentLogin);
	app.route('/studentRegister').post(student.studentRegister);
	app.route('/studentGetAllCourses').post(student.studentGetAllCourses);
	app.route('/markCourseAsFavourite').post(student.markCourseAsFavourite);
	app.route('/markCourseAsUnFavourite').post(student.markCourseAsUnFavourite);
	app.route('/getFavouriteCourses').post(student.getFavouriteCourses);
	app.route('/getAllNotices').post(student.getAllNotices);
	app.route('/postNotice').post(student.postNotice);
	app.route('/removeNotice').post(student.removeNotice);
	app.route('/updateNotice').post(student.updateNotice);
	app.route('/studentRegister').post(student.studentRegister);
	app.route('/getProfileData').post(student.getProfileData);
	app.route('/updateProfileData').post(student.updateProfileData);
	app.route('/createCourse').post(student.createCourse);
	app.route('/getAllCourseContents').post(student.getAllCourseContents);
	app.route('/postForum').post(student.postForum);
	app.route('/getAllForum').post(student.getAllForum);
	app.route('/postFeedback').post(student.postFeedback);
	app.route('/getFeeds').post(student.getFeeds);


	//Shoping
	app.route('/getAllItems').post(shoping.getAllItems);
	app.route('/insertItemToCart').post(shoping.insertItemToCart);
	app.route('/removeItemFromCart').post(shoping.removeItemFromCart);
	app.route('/getAllItemsInCart').post(shoping.getAllItemsInCart);

};
