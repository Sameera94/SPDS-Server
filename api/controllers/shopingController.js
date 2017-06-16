'use strict';
var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	user: 'root',
	password: 'root',
	database: 'spds_db'
});

exports.studentRegister = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			name	 : req.body.name,
			email	 : req.body.email,
			password : req.body.password
		};

		connection.query('INSERT INTO student SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error);
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}


exports.studentLogin = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student where email=? && password=?", [req.body.username, req.body.password]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			if (results.length > 0) {
				res.status(200).send({
					status: true,
					user: results
				});
			} else {
				res.status(200).send({
					status: false
				});
			}
		});
	});
}

exports.getAllItems = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from shoping_items");

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.insertItemToCart = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			item_id	 : req.body.ItemId,
			user_id	 : req.body.userId,
			count 	 : req.body.count
		};

		connection.query('INSERT INTO shoping_cart SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error);
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.getAllItemsInCart = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select c.id, c.item_id, c.user_id, c.count, i.name, i.price, i.category from shoping_cart c, shoping_items i WHERE c.item_id=i.id AND c.user_id=?",[req.body.userId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.removeItemFromCart = function (req, res) {
	
	pool.getConnection(function (err, connection) {

		var sql = mysql.format("DELETE FROM shoping_cart where id=?",[req.body.cartItemId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error)
				res.status(200).send(error);
			}
			res.status(200).send(results);
		});
	});
}
