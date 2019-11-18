"use strict";
const mysql = require('mysql');

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
}
else{
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'user',
		password: 'password'
	});
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

if(production){
	let drop_events = 'DROP TABLE events';
	let drop_garages = 'DROP TABLE garages';
	let drop_issues = 'DROP TABLE issues';
	let drop_users = 'DROP TABLE users';
	let drop_images = 'DROP TABLE images';
	databaseQuery(drop_events).then(databaseQuery(drop_garages))
	.then(databaseQuery(drop_issues)).then(databaseQuery(drop_users))
	.then(databaseQuery(drop_images)).then(function(){
		console.log('Tables Dropped!');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
else{
	let drop_db = 'DROP DATABASE owl_alerts';
	databaseQuery(drop_db).then(function(){
		console.log('Database Deleted!');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
