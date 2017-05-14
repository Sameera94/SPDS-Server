'use strict';
var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	user: 'root',
	password: 'root',
	database: 'spds_db'
});

exports.validateUserLogin = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from users where email=? && password=?", [req.body.username, req.body.password]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			if (results.length > 0) {
				res.status(200).send(true);
			} else {
				res.status(200).send(false);
			}
		});
	});
}

exports.createNewUser = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phoneNumber,
			email: req.body.email,
			password: req.body.password
		};

		connection.query('INSERT INTO users SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}