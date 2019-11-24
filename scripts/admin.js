"use strict";
const pool = require('../lib/pool_db');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

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