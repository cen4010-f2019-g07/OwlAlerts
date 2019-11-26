"use strict";
const mysql = require('mysql');
const production = process.env.production || false;
var connection;
const create_db = 'CREATE DATABASE owl_alerts';
const use_db = 'USE owl_alerts';
const create_images = 'CREATE TABLE images( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, \
description TEXT NOT NULL, type VARCHAR(100) NOT NULL, size INT(11) NOT NULL, \
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id))';
const create_users = 'CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, residency VARCHAR(100), \
faculty BOOL NOT NULL DEFAULT false, admin BOOL NOT NULL DEFAULT false, housing_status VARCHAR(100), \
building VARCHAR(255), room_number VARCHAR(255), phone_number VARCHAR(255), street VARCHAR(255), \
city VARCHAR(255), state VARCHAR(255), zip VARCHAR(255), country VARCHAR(255), \
email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, \
lastname VARCHAR(255) NOT NULL, image_id INT, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id), FOREIGN KEY (image_id) REFERENCES images(id), UNIQUE(email))';
const create_garages = 'CREATE TABLE garages( id INT NOT NULL AUTO_INCREMENT, \
location VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, full BOOL NOT NULL DEFAULT false, \
free_spots INT NOT NULL DEFAULT 0, total_spots INT NOT NULL, \
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id))';
const create_events = 'CREATE TABLE events( id INT NOT NULL AUTO_INCREMENT, \
location VARCHAR(255) NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME NOT NULL, \
description TEXT NOT NULL, submitted_user INT NOT NULL, host VARCHAR(255) NOT NULL, \
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), \
FOREIGN KEY (submitted_user) REFERENCES users(id))';
const create_issues = 'CREATE TABLE issues( id INT NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, \
description TEXT NOT NULL, location VARCHAR(255) NOT NULL, verified BOOL NOT NULL DEFAULT false, \
resolved BOOL NOT NULL DEFAULT false, submitted_user INT NOT NULL, verified_faculty INT, \
resolved_faculty INT, image_id INT, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, \
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \
PRIMARY KEY (id), FOREIGN KEY (submitted_user) REFERENCES users(id), \
FOREIGN KEY (verified_faculty) REFERENCES users(id), FOREIGN KEY (resolved_faculty) REFERENCES users(id), \
FOREIGN KEY (image_id) REFERENCES images(id))';

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
	console.log('---------------------------------------------------');
	databaseQuery(create_images).then(function(){
		console.log('Images Table Created!');
	}).then(databaseQuery(create_users)).then(function(){
		console.log('Users Table Created!');
	}).then(databaseQuery(create_garages)).then(function(){
		console.log('Garages Table Created!');
	}).then(databaseQuery(create_events)).then(function(){
		console.log('Events Table Created!');
	}).then(databaseQuery(create_issues)).then(function(){
		console.log('Issues Table Created!');
	}).then(function(){
		console.log('All Tables Created!');
		console.log('Table Creation Finished!');
		console.log('---------------------------------------------------');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
else{
	console.log('---------------------------------------------------');
	databaseQuery(create_db).then(function(){
		console.log('Database Created!');
	}).then(databaseQuery(use_db)).then(function(){
		console.log('Owl Alerts Database Selected!');
	}).then(databaseQuery(create_images)).then(function(){
		console.log('Images Table Created!');
	}).then(databaseQuery(create_users)).then(function(){
		console.log('Users Table Created!');
	}).then(databaseQuery(create_garages)).then(function(){
		console.log('Garages Table Created!');
	}).then(databaseQuery(create_events)).then(function(){
		console.log('Events Table Created!');
	}).then(databaseQuery(create_issues)).then(function(){
		console.log('Issues Table Created!');
	}).then(function(){
		console.log('All Tables Created!');
		console.log('Database Creation Finished!');
		console.log('---------------------------------------------------');
		connection.end();
		return;
	}).catch(function(err){
		console.log(err);
	});
}
