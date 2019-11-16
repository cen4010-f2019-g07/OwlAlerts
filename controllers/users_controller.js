var user = require('../models/user');
const mysql = require('mysql');
const production = process.env.production;
const bodyParser = require('body-parser');
passport = require('../config/passport');

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

// Home Page for Users.
exports.index = function(req, res){
	let query = 'SELECT * FROM users';
	databaseQuery(query).then(function(data){
		res.render('pages/users/index', {
			users: data
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Users.
exports.user_list = function(req, res) {
	let query = 'SELECT * FROM users';
	databaseQuery(query).then(function(data){
    res.render('pages/users/userlist',
    {
      users: data
    });
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
	console.log(req.user);
	let query = `SELECT * FROM users WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Display User create form on GET.
exports.user_create_get = function(req, res) {
  res.render('pages/users/signup');
};

// Handle User create on POST.
exports.user_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: User create POST');
};

// Display User delete form on GET.
exports.user_delete_get = function(req, res) {
	let query = `SELECT * FROM users WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: User delete GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
	let query = `SELECT * FROM users WHERE id=${req.params.id}`;
	databaseQuery(query).then(function(result){
		let data = result[0]; //The returned result is an array with one element
		return data;
	}).then(function(data){
		//Data holds the information for the issue with the id param
		res.send('NOT IMPLEMENTED: User update GET: ' + req.params.id);
	}).catch(function(err){
		console.log(err);
	});
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: User update POST');
};

//User Sign In Page
exports.user_signin_get = function(req, res){
	res.render('pages/users/signin');
}

//Handle Post Request for User Sign In Page
exports.user_signin_post = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/signin',
		failureFlash: true
	})(req, res, next);
}

exports.user_logout_get = function(req, res){
	req.logout();
	res.redirect('/');
}