"use strict";
process.env.test = true;
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const faker = require('faker');
//var pool = require('../../lib/pool_db');
const GarageModel = require('../../models/garage');

describe('Garage Model', function(){
	let fakeGarage = {};

	after(function(){
		GarageModel.closeDB();
		delete require.cache[require.resolve('../../lib/pool_db')];
		return;
	});

	describe('create function', function(){
		it('should return 1 row affected');
	});

	describe('update function', function(){
		it('should return 1');
	});

	describe('delete function', function(){
		it('should return 1 row affected');
	});
})