var event = require('../models/event');
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

// Home page for Events
exports.index = function(req, res) {
	let query = 'SELECT * FROM events';
	databaseQuery(query).then(function(data){
		res.send('NOT IMPLEMENTED: Event index');
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Events.
exports.event_list = function(req, res) {
	let query = 'SELECT * FROM events';
	databaseQuery(query).then(function(data){
		res.send('NOT IMPLEMENTED: Event list');
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific Event.
exports.event_detail = function(req, res) {
	let query = `SELECT * FROM events WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Event detail: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Display Event create form on GET.
exports.event_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Event create GET');
};

// Handle Event create on POST.
exports.event_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Event create POST');
};

// Display Event delete form on GET.
exports.event_delete_get = function(req, res) {
	let query = `SELECT * FROM events WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Event delete GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Event delete on POST.
exports.event_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Event delete POST');
};

// Display Event update form on GET.
exports.event_update_get = function(req, res) {
	let query = `SELECT * FROM events WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Evnet update GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Event update on POST.
exports.event_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Event update POST');
};