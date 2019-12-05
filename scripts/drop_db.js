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
else if(heroku){
	connection = mysql.createConnection({
		connectionLimit: 10,
		host: 'us-cdbr-iron-east-05.cleardb.net',
		user: 'be3b4cd98a2bb8',
		password: '7983bb95',
		database: 'heroku_3037d87a43348dd',
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

if(production || heroku){
	let drop_events = 'DROP TABLE events';
	let drop_garages = 'DROP TABLE garages';
	let drop_issues = 'DROP TABLE issues';
	let drop_users = 'DROP TABLE users';
	let drop_images = 'DROP TABLE images';
	console.log('---------------------------------------------------');
	databaseQuery(drop_events).then(function(){
		console.log('Event Table Dropped!');
	}).then(databaseQuery(drop_garages)).then(function(){
		console.log('Garage Table Dropped!');
	}).then(databaseQuery(drop_issues)).then(function(){
		console.log('Issue Table Dropped!');
	}).then(databaseQuery(drop_users)).then(function(){
		console.log('User Table Dropped!');
	}).then(databaseQuery(drop_images)).then(function(){
		console.log('Image Table Dropped!');
		console.log('Tables Dropped!');
		console.log('---------------------------------------------------');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
else{
	let drop_db = 'DROP DATABASE owl_alerts';
	databaseQuery(drop_db).then(function(){
		console.log('---------------------------------------------------');
		console.log('Database Deleted!');
		console.log('---------------------------------------------------');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
