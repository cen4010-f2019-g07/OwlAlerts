"use strict";
const mysql = require('mysql');
require('dotenv').config();
const production = process.env.production || false;
const heroku = process.env.heroku || false;
var connection;

if(production){
	connection = mysql.createConnection({
		connectionLimit: 10,
		host: process.env.LAMP_DB_HOST,
		user: process.env.LAMP_DB_USER,
		password: process.env.LAMP_DB_PASSWORD,
		database: process.env.LAMP_DB_DATABASE,
		multipleStatements: true
	});
}
else if(heroku){
	connection = mysql.createConnection({
		connectionLimit: 10,
		host: process.env.HEROKU_DB_HOST,
		user: process.env.HEROKU_DB_USER,
		password: process.env.HEROKU_DB_PASSWORD,
		database: process.env.HEROKU_DB_DATABASE,
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
		console.log('All Tables Dropped!');
		console.log('---------------------------------------------------');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
else{
	let drop_db = {
		owl_alerts: 'DROP DATABASE owl_alerts',
		owl_alerts_tests: 'DROP DATABASE owl_alerts_tests'
	};
	databaseQuery(drop_db.owl_alerts).then(function(){
		databaseQuery(drop_db.owl_alerts_tests).catch(function(err){
			console.log(err);
		});
	}).then(function(){
		console.log('---------------------------------------------------');
		console.log('Databases Deleted!');
		console.log('---------------------------------------------------');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
