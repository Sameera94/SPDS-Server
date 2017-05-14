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
			deliveryFrom : req.body.deliveryFrom,
			deliveryTo	 : req.body.deliveryTo,
			deliveryDate : req.body.deliveryDate,
			title		 : req.body.title,
			description	 : req.body.description,
			userId		 : req.body.user
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

exports.getAllOrders = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from orders o, users u where o.userId = u.id AND u.id = ?", [req.body.user]);
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}