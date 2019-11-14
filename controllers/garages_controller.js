var garage = require('../models/garage');
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

// Home Page for Garages
exports.index = function(req, res) {
	let query = 'SELECT * FROM garages';
	databaseQuery(query).then(function(data){
		res.send('NOT IMPLEMENTED: Garage index');
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Garages.
exports.garage_list = function(req, res) {
	let query = 'SELECT * FROM garages';
	databaseQuery(query).then(function(data){
		res.send('NOT IMPLEMENTED: Garage list');
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific Garage.
exports.garage_detail = function(req, res) {
	let query = `SELECT * FROM garages WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Garage detail: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Display Garage create form on GET.
exports.garage_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage create GET');
};

// Handle Garage create on POST.
exports.garage_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage create POST');
};

// Display Garage delete form on GET.
exports.garage_delete_get = function(req, res) {
	let query = `SELECT * FROM garages WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Garage delete GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Garage delete on POST.
exports.garage_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage delete POST');
};

// Display Garage update form on GET.
exports.garage_update_get = function(req, res) {
	let query = `SELECT * FROM garages WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: Garage update GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle Garage update on POST.
exports.garage_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Garage update POST');
};