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

exports.studentGetAllCourses = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student_courses");

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.markCourseAsFavourite = function (req, res) {
	
	pool.getConnection(function (err, connection) {

		var sql = mysql.format("update student_courses SET is_favourite = 1 where id=? AND student_id=?",[req.body.courseId, req.body.stdId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error)
				res.status(200).send(error);
			}
			console.log("ceame")
			res.status(200).send(results);
		});
	});
}

exports.markCourseAsUnFavourite = function (req, res) {
	
	pool.getConnection(function (err, connection) {

		var sql = mysql.format("update student_courses SET is_favourite = 0 where id=? AND student_id=?",[req.body.courseId, req.body.stdId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error)
				res.status(200).send(error);
			}
			console.log("ceame")
			res.status(200).send(results);
		});
	});
}

exports.getFavouriteCourses = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student_courses where student_id=? AND is_favourite=1",[req.body.stdId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.getAllNotices = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student_notices order by createdDate DESC");

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.postNotice = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			title	  : req.body.title,
			body	  : req.body.description,
			course_id : req.body.courseId
		};

		connection.query('INSERT INTO student_notices SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error);
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.removeNotice = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("DELETE FROM student_notices where id=?",[req.body.noticeId]);
		
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.updateNotice = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("UPDATE student_notices SET title=?, body=? WHERE id=?",[req.body.newTitle, req.body.newDescription, req.body.noticeId]);
		
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}


exports.getProfileData = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student where id=?",[req.body.userId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.updateProfileData = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("UPDATE student SET name=?, email=? WHERE id=?",[req.body.name, req.body.email, req.body.userId]);
		
		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.createCourse = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			name	: req.body.title,
			student_id	  : 1,
			is_favourite : 0
		};

		connection.query('INSERT INTO student_courses SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error);
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}



exports.getAllCourseContents = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student_contents where course_id=?",[req.body.courseId]);

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.postFeedback = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			rate	  : req.body.rate,
			description	  : req.body.description
		};

		connection.query('INSERT INTO student_feedback SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error);
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}

exports.postForum = function (req, res) {

	pool.getConnection(function (err, connection) {

		var values = {
			title	  : req.body.title,
			description	  : req.body.description,
			post_by : req.body.userName
		};

		connection.query('INSERT INTO student_forum SET ?', values, function (error, results, fields) {
			connection.release();
			if (error) {
				console.log(error);
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}



exports.getAllForum = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student_forum order by createdDate DESC");

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}
exports.getFeeds = function (req, res) {

	pool.getConnection(function (err, connection) {

		var sql = mysql.format("select * from student_feedback order by createdDate DESC");

		connection.query(sql, function (error, results, fields) {
			connection.release();
			if (error) {
				res.status(200).send(error);
			}

			res.status(200).send(results);
		});
	});
}
