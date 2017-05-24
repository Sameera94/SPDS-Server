'use strict';
var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	user: 'root',
	password: 'root',
	database: 'spds_db'
});

exports.createNewOrder = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			deliveryFrom	: req.body.deliveryFrom,
			deliveryTo	    : req.body.deliveryTo,
			deliveryDate	: req.body.deliveryDate,
			title			: req.body.title,
			description		: req.body.description,
			userId			: req.body.userId,
			ridderId		: req.body.ridderId,
			estimatedCost   : req.body.estimatedCost,
			distance		: req.body.distance,
			discount		: req.body.discount
		};

		connection.query('INSERT INTO orders SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.getAllNewOrders = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from orders WHERE userId = ? AND accepted = 1 order by createdDate DESC", [req.body.user]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.getAllOrdersDue = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from orders WHERE userId = ? AND accepted = 2 order by createdDate DESC", [req.body.user]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}
			
			res.status(200).send(results);
		});
	});
}

exports.cancelOrder = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("UPDATE orders SET accepted = 3 WHERE id = ?", [req.body.orderId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}


exports.getAllOrdersDesktop = function (req, res) {

	pool.getConnection(function (err, connection) {
		var sql = mysql.format("select * from orders order by createdDate DESC");
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.getAllRidders = function (req, res) {

	pool.getConnection(function (err, connection) {
		var sql = mysql.format("select * from riders");
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}


