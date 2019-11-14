var user = require('../models/user');

const mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 100,
	host: 'localhost',
	user: 'user',
	password: 'password',
	database: 'owl_alerts',
	multipleStatements: true
});


// Home Page for Users.
exports.index = function(req, res){
	res.render('pages/users/index');
};

// Display list of all Users.
exports.user_list = function(req, res) {
	var query = 'SELECT * FROM users';
	pool.getConnection(function(error, connection){
		if(error) throw error;
		pool.query(query, function(err, result, fields){
			if(err) throw err;
			res.render('pages/users/userlist',
			{
				users: result
			});
		});
  	});
};

// Display detail page for a specific User.
exports.user_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
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
  res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle User delete on POST.
exports.user_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: User delete POST');
};

// Display User update form on GET.
exports.user_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: User update POST');
};