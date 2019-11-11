const mysql = require('mysql');
const drop_db = 'DROP DATABASE owl_alerts';

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password'
});

connection.connect(function(error){
	if(error) throw error;
	console.log('Connected to MySQL!');
	connection.query(drop_db, function(err, rows, fields){
		if(err) throw err;
		console.log('Database Deleted!');
	});
	connection.end();
	return;
});