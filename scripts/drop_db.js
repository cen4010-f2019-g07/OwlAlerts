const mysql = require('mysql');
const drop_db = 'DROP DATABASE owl_alerts';

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password'
});

function databaseQuery(queryString){
	return new Promise(function(resolve, reject){
		connection.query(queryString, function(err, rows, fields){
			if(err)
				return reject(err);
			resolve(rows);
		});
	});
}

databaseQuery(drop_db).then(function(){
	console.log('Database Deleted!');
	connection.end();
	return;
}).catch(function(err){
	console.log(err);
});