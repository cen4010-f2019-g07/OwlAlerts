var issue = require('../models/issue');
const mysql = require('mysql');
const production = process.env.production;
const bodyParser = require('body-parser');

if(production == true){
	pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07',
		multipleStatements: true
	});
}
else{
	pool = mysql.createPool({
		connectionLimit: 100,
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'owl_alerts',
		multipleStatements: true
	});
}

function databaseQuery(query){
	return new Promise(function(resolve, reject){
		pool.getConnection(function(error, connection){
			connection.query(query, function(err, rows, fields){
				connection.release();
				if(err)
					return reject(err);
				resolve(rows);
			});
		});
	});
}

//Home page for Issues.
exports.index = function(req, res) {
	let query = 'SELECT * FROM issues';
	databaseQuery(query).then(function(results){
		let data = [];
		console.log(results);
		return data;
	}).then(function(data){
		res.send('NOT IMPLEMENTED: Issue index');
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Issues.
exports.issue_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue list');
};

// Display detail page for a specific Issue.
exports.issue_detail = function(req, res) {
	let query = `SELECT * FROM issues WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){

	})
  res.send('NOT IMPLEMENTED: Issue detail: ' + req.params.id);
};

// Display Issue create form on GET.
exports.issue_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue create GET');
};

// Handle Issue create on POST.
exports.issue_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue create POST');
};

// Display Issue delete form on GET.
exports.issue_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue delete GET');
};

// Handle Issue delete on POST.
exports.issue_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue delete POST');
};

// Display Issue update form on GET.
exports.issue_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue update GET');
};

// Handle Issue update on POST.
exports.issue_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Issue update POST');
};