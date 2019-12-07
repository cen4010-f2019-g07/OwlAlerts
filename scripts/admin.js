"use strict";
const mysql = require('mysql');
const faker = require('faker');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const production = process.env.production || false;
const heroku = process.env.heroku || false;
const saltRounds = 10;
var pool;

if(production){
	pool = mysql.createPool({
		connectionLimit: 10,
		host: process.env.LAMP_DB_HOST,
		user: process.env.LAMP_DB_USER,
		password: process.env.LAMP_DB_PASSWORD,
		database: process.env.LAMP_DB_DATABASE,
		multipleStatements: true
	});
}
else if(heroku){
	pool = mysql.createPool({
		connectionLimit: 10,
		host: process.env.HEROKU_DB_HOST,
		user: process.env.HEROKU_DB_USER,
		password: process.env.HEROKU_DB_PASSWORD,
		database: process.env.HEROKU_DB_DATABASE,
		multipleStatements: true
	});
}
else{
	pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'owl_alerts',
		multipleStatements: true
	});
}

function databaseQuery(query){
	return new Promise(function(resolve, reject){
		pool.query(query, function(err, rows, fields){
			if(err)
				return reject(err);
			resolve(rows);
		});
	});
}

function seedAdmin(){
	return new Promise(function(resolve, reject){
		let firstname = 'Development';
		let lastname = 'Admin';
		let email = 'admin@fau.edu';
		let password = 'password';
		bcrypt.hash(password, saltRounds).then(function(hash){
			let adminQuery = `INSERT INTO users(firstname, lastname, email, password, admin) \
			VALUE(\'${firstname}\', \'${lastname}\', \'${email}\', \'${hash}\', true)`;
			databaseQuery(adminQuery).then(function(result){
					console.log('---------------------------------------------------');
					console.log(`Admin User First Name: ${firstname}`);
					console.log(`Admin User Last Name: ${lastname}`);
					console.log(`Admin User Email Address: ${email}`);
					console.log(`Admin User Password: ${password}`);
					resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		}).catch(function(err){
			console.log(err);
		});
	});
}

seedAdmin().then(function(){
	console.log('---------------------------------------------------');
	console.log('Admin Created!');
	pool.end();
	return;
}).catch(function(err){
	console.log(err);
});