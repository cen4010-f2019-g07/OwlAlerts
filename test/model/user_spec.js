"use strict";
process.env.test = true;
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const pool = require('../../lib/pool_db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const UserModel = require('../../models/user');

describe('User Model', function(){
	let fakeUser = {};

	after(function(){
		pool.end();
		return;
	});

	describe('create function', function(){
		fakeUser.firstname = 'First';
		fakeUser.lastname = 'Last';
		fakeUser.email = 'firstlast@email.com';
		fakeUser.password = 'password';
		it('should affect one row', function(done){
			UserModel.create(fakeUser.firstname, fakeUser.lastname, fakeUser.email, fakeUser.password).then(function(result){
				fakeUser.id = result.insertId;
				assert.equal(result.affectedRows, 1);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			});
		});
	});

	describe('update function', function(){
		fakeUser.residency = 'In-State';
		fakeUser.building = 'IVAN';
		fakeUser.room_number = '203A';
		it('should return a 1', function(done){
			UserModel.update(fakeUser).then(function(result){
				assert.equal(result, 1);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			});
		});
	});

	describe('get function', function(){
		it('should get an object', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				expect(user).to.be.an('object');
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			});
		});
		it('should get user firstname', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				assert.equal(user.firstname, fakeUser.firstname);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			})
		});
		it('should get user lastname', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				assert.equal(user.lastname, fakeUser.lastname);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			})
		});
		it('should get user email', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				assert.equal(user.email, fakeUser.email);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			})
		});
		it('should get user password', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				bcrypt.compare(fakeUser.password, user.password).then(function(result){
					expect(result).to.be.true;
				}).then(function(){
					done();
				}).catch(function(err){
					console.log(err);
				});
			});
		});
		it('should get user residency', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				assert.equal(user.residency, fakeUser.residency);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			})
		});
		it('should get user building', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				assert.equal(user.building, fakeUser.building);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			})
		});
		it('should get user room_number', function(done){
			UserModel.get(fakeUser.id).then(function(user){
				assert.equal(user.room_number, fakeUser.room_number);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			})
		});
	});

	describe('all function', function(){
		it('should get one user', function(done){
			UserModel.all().then(function(users){
				expect(users).to.not.be.empty;
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			});
		});
	});

	describe('delete function', function(){
		it('should delete user', function(done){
			UserModel.delete(fakeUser.id).then(function(result){
				assert.equal(result.affectedRows, 1);
			}).then(function(){
				done();
			}).catch(function(err){
				console.log(err);
			});
		});
	});
})