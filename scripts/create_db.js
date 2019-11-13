const mysql = require('mysql');
const create_db = 'CREATE DATABASE owl_alerts';
const use_db = 'USE owl_alerts';
const create_users = 'CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, residency VARCHAR(100), \
faculty BOOL NOT NULL DEFAULT false, commuter BOOL NOT NULL DEFAULT false, \
dormer BOOL NOT NULL DEFAULT false, building VARCHAR(100), room_number VARCHAR(100), \
phone_number VARCHAR(100), street VARCHAR(255), city VARCHAR(255), state VARCHAR(255), \
zip VARCHAR(255), country VARCHAR(255), email VARCHAR(100) NOT NULL, password VARCHAR(255), \
firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, PRIMARY KEY (id))';
const create_garages = 'CREATE TABLE garages( id INT NOT NULL AUTO_INCREMENT, \
location VARCHAR(100) NOT NULL, name VARCHAR(100) NOT NULL, full BOOL NOT NULL DEFAULT false, \
free_spots INT NOT NULL DEFAULT 0, total_spots INT NOT NULL, PRIMARY KEY (id))';
const create_events = 'CREATE TABLE events( id INT NOT NULL AUTO_INCREMENT, \
location VARCHAR(255) NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME NOT NULL, \
description TEXT NOT NULL, submitted_user INT NOT NULL, host VARCHAR(255) NOT NULL, PRIMARY KEY (id), \
FOREIGN KEY (submitted_user) REFERENCES users(id))';
const create_issues = 'CREATE TABLE issues( id INT NOT NULL AUTO_INCREMENT, description TEXT NOT NULL, \
location VARCHAR(255) NOT NULL, verified BOOL NOT NULL DEFAULT false, resolved BOOL NOT NULL DEFAULT false, \
submitted_user INT NOT NULL, verified_faculty INT, resolved_faculty INT, PRIMARY KEY (id), \
FOREIGN KEY (submitted_user) REFERENCES users(id), FOREIGN KEY (verified_faculty) REFERENCES users(id), \
FOREIGN KEY (resolved_faculty) REFERENCES users(id))';
const create_imgs = 'CREATE TABLE img( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, \
description TEXT NOT NULL, type VARCHAR(100) NOT NULL, size INT(11) NOT NULL, PRIMARY KEY (id))';

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password'
});

connection.connect(function(err){
	if(err) throw err;
	console.log('Connected to MySQL!');
	connection.query(create_db, function(err, result){
		if(err) throw err;
		console.log('Database Created!');
	});
	connection.query(use_db, function(err, result){
		if(err) throw err;
		console.log('Owl Alerts Database Selected!');
	});
	connection.query(create_users, function(err, result){
		if(err) throw err;
		console.log('Users Table Created!');
	});
	connection.query(create_garages, function(err, result){
		if(err) throw err;
		console.log('Garages Table Created!');
	});
	connection.query(create_events, function(err, result){
		if(err) throw err;
		console.log('Events Table Created!');
	});
	connection.query(create_issues, function(err, result){
		if(err) throw err;
		console.log('Issues Table Created!');
	});
	connection.query(create_imgs, function(err, result){
		if(err) throw err;
		console.log('Images Table Created!');
	});
	connection.end();
	return;
});