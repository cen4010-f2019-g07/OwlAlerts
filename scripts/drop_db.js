"use strict";
const mysql = require('mysql');
const drop_db;
const production = process.env.production || false;
var connection;

if(production){
	connection = mysql.createConnection({
		connectionLimit: 10,
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07',
		multipleStatements: true
	});
	let drop_events = 'DROP TABLE events';
	let drop_garages = 'DROP TABLE garages';
	let drop_issues = 'DROP TABLE issues';
	let drop_users = 'DROP TABLE users';
	drop_db = [drop_events, drop_garages, drop_issues, drop_users];
}
else{
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'user',
		password: 'password'
	});
	drop_db = 'DROP DATABASE owl_alerts';
}


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