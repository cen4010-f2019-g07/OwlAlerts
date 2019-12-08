"use strict";
process.env.test = true;
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const faker = require('faker');
var pool = require('../../lib/pool_db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const UserModel = require('../../models/user');

describe('User Model', function(){
	let fakeUser = {};
	let residency_values = ['Out-State', 'In-State'];
	let housing_status_values = ['Commuter', 'Dormer'];
	let building_values = ['IVAS', 'IVAN', 'UVA 57', 'UVA 58', 'UVA 59', 'UVA 60', 
		'UVA 61', 'PAR', 'HPT', 'GPT', 'IRT'];
	let counter = 0;
	let uva_rooms = [];
	let format_j;
	for(let j = 0; j < 2; j++){
		for(let k = 0; k < 30; k++){
			format_j = ('0' + k).slice(-2);
			uva_rooms[counter] = `${j+1}${format_j}`;
			counter++;
		}
	}
	let iva_rooms = [];
	counter = 0;
	for(let j = 0; j < 7; j++){
		for(let k = 0; k < 70; k++){
			format_j = ('0' + k).slice(-2);
			iva_rooms[counter] = `${j+1}${format_j}`;
			counter++;
		}
	}
	let par_rooms = [];
	counter = 0;
	for(let j = 0; j < 5; j++){
		for(let k = 0; k < 30; k++){
			format_j = ('0' + k).slice(-2);
			par_rooms[counter] = `${j+1}${format_j}`;
			counter++
		}
	}
	let hpt_rooms = [];
	counter = 0;
	for(let j = 0; j < 7; j++){419
		for(let k = 0; k < 60; k++){
			format_j = ('0' + k).slice(-2);
			hpt_rooms[counter] = `${j+1}${format_j}`;
			counter++
		}
	}
	let gpt_rooms = [];
	counter = 0;
	for(let j = 0; j < 7; j++){
		for(let k = 0; k < 60; k++){
			format_j = ('0' + k).slice(-2);
			gpt_rooms[counter] = `${j+1}${format_j}`;
			counter++
		}
	}
	let irt_rooms = [];
	counter = 0;
	for(let j = 0; j < 7; j++){
		for(let k = 0; k < 60; k++){
			format_j = ('0' + k).slice(-2);
			irt_rooms[counter] = `${j+1}${format_j}`;
			counter++
		}
	}

	after(function(){
		UserModel.closeDB();
		delete require.cache[require.resolve('../../lib/pool_db')];
		return;
	});

	describe('create function', function(){
		fakeUser.firstname = faker.name.firstName()
		fakeUser.lastname = faker.name.lastName();
		fakeUser.email = faker.internet.password();
		fakeUser.password = faker.internet.password();
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

	describe('update function - Dormer', function(){
		fakeUser.housing_status = 'Dormer';
		fakeUser.residency = residency_values[Math.round(Math.random())];
		fakeUser.building = building_values[Math.round(Math.random()*10)];
		switch(fakeUser.building){
			case 'PAR':
				fakeUser.room_number = par_rooms[Math.round(Math.random()*149)]
				break;
			case 'UVA 57':
				fakeUser.room_number = uva_rooms[Math.round(Math.random()*59)]
				break;
			case 'UVA 58':
				fakeUser.room_number = uva_rooms[Math.round(Math.random()*59)]
				break;
			case 'UVA 59':
				fakeUser.room_number = uva_rooms[Math.round(Math.random()*59)]
				break;
			case 'UVA 60':
				fakeUser.room_number = uva_rooms[Math.round(Math.random()*59)]
				break;
			case 'UVA 61':
				fakeUser.room_number = uva_rooms[Math.round(Math.random()*59)]
				break;
			case 'IRT':
				fakeUser.room_number = irt_rooms[Math.round(Math.random()*419)]
				break;
			case 'HPT':
				fakeUser.room_number = hpt_rooms[Math.round(Math.random()*419)]
				break;
			case 'GPT':
				fakeUser.room_number = gpt_rooms[Math.round(Math.random()*419)]
				break;
			case 'IVAS':
				fakeUser.room_number = iva_rooms[Math.round(Math.random()*489)]
				break;
			case 'IVAN':
				fakeUser.room_number = iva_rooms[Math.round(Math.random()*489)]
				break;
			default:
				console.log('Room Switch Statment Not Working!');
		}
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