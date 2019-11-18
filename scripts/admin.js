"use strict";
const mysql = require('mysql');
const faker = require('faker');
const production = process.env.production || false;
var pool;

if(production){
	pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07'
	});
	console.log('Connected to Production Database!');
}
else{
	pool = mysql.createPool({
		connectionLimit: 10,
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'owl_alerts'
	});
	console.log('Connected to Development Database!');
}

function seedAdmin(){
	return new Promise(function(resolve, reject){
		let firstname = 'Development';
		let lastname = 'Admin';
		let email = 'admin@fau.edu';
		let password = 'password';
		let adminQuery = `INSERT INTO users(firstname, lastname, email, password, admin) \
		VALUE(\'${firstname}\', \'${lastname}\', \'${email}\', \'${password}\', true)`;
		pool.getConnection(function(error, connection){
			if(error)
				return reject(error);
			connection.query(adminQuery, function(err, rows, fields){
				if(err)
					return reject(err);
				connection.release();
				console.log('---------------------------------------------------');
				console.log(`Admin User First Name: ${firstname}`);
				console.log(`Admin User Last Name: ${lastname}`);
				console.log(`Admin User Email Address: ${email}`);
				console.log(`Admin User Password: ${password}`);
				resolve(rows);
			});
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