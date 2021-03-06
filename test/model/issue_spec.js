"use strict";
process.env.test = true;
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const faker = require('faker');
const IssueModel = require('../../models/issue');

describe('Issue Model', function(){
	let fakeIssue = {};

	after(function(){
		IssueModel.endPool();
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