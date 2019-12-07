"use strict";
const mysql = require('mysql');
const production = process.env.production || false;
const heroku = process.env.heroku || false;
require('dotenv').config();
var pool;

if(production){
	pool = mysql.createPool({
		connectionLimit: 1000,
		host: process.env.LAMP_DB_HOST,
		user: process.env.LAMP_DB_USER,
		password: process.env.LAMP_DB_PASSWORD,
		database: process.env.LAMP_DB_DATABASE,
		multipleStatements: true
	});
}
else if(heroku){
	pool = mysql.createPool({
		connectionLimit: 1000,
		host: process.env.HEROKU_DB_HOST,
		user: process.env.HEROKU_DB_USER,
		password: process.env.HEROKU_DB_PASSWORD,
		database: process.env.HEROKU_DB_DATABASE,
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

pool.on('acquire', function(connection){
	console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function(connection){
	console.log('Connection %d released', connection.threadId);
});

pool.on('enqueue', function(){
	console.log('Waiting for available connection slot');
});

pool.on('connection', function(connection){
	connection.query('SET SESSION auto_increment_increment=1');
});

module.exports = pool;