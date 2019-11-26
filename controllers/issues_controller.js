"use strict";
var IssueModel = require('../models/issue');
const paginate = require('express-paginate');

//Home page for Issues.
exports.index = function(req, res) {
	IssueModel.getRecent(5).then(function(data){
		res.render('pages/issues/index',
    {
      sessionUser: req.user,
      issues: data,
      message: req.flash()
    });
	}).catch(function(err){
		console.log(err);
	});
};

// Display list of all Issues.
exports.issue_list = function(req, res) {
	let numPerPage = parseInt(req.query.npp, 10) || 10;
	let page = parseInt(req.query.page, 10) || 0;
	let skip = (page-1) * numPerPage;
	let limit = skip + ',' + numPerPage;
	var itemCount;
	var pageCount;
	IssueModel.allCount().then(function(issueCount){
		itemCount = issueCount;
		pageCount = Math.ceil(itemCount/req.query.limit);
	}).then(function(){
		IssueModel.allPaginate(limit).then(function(data){
			res.render('pages/issues/issuelist',
	    {
        sessionUser: req.user,
	      issues: data,
	      pageCount,
	      itemCount,
	      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
	    });
		}).catch(function(err){
			console.log(err);
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display detail page for a specific Issue.
exports.issue_detail = function(req, res) {
	IssueModel.get(req.params.id).then(function(data){
		//Data holds the information for the issue with the id param
		res.render('pages/issues/show',
		{
			sessionUser: req.user,
			issue: data,
			message: req.flash()
		});
	}).catch(function(err){
		console.log(err);
	});
};

// Display Issue create form on GET.
exports.issue_create_get = function(req, res) {
	if(req.user){
		res.render('pages/issues/create',
	  {
		  sessionUser: req.user,
		  message: req.flash()
	  });
	}
  else{
  	req.flash('info', 'Please Sign In to Report An Issue!');
  	res.redirect('/users/signin');
  }
};

// Handle Issue create on POST.
exports.issue_create_post = function(req, res) {
	if(req.user){
		let attr = {};
		attr['title'] = req.body.title;
		attr['description'] = req.body.description;
		attr['location'] = req.body.location;
		attr['submitted_user'] = req.user.id;
		IssueModel.create(attr).then(function(){
			res.redirect('/issues/create');
		});
	}
	else{
		req.flash('info', 'Please Sign In to Report An Issue!');
		res.redirect('/users/signin');
	}
};

// Display Issue delete form on GET.
exports.issue_delete_get = function(req, res) {
	if(req.user){
		if(req.user.faculty || req.user.admin){
			IssueModel.delete(req.params.id).then(function(result){
				//Data holds the information for the issue with the id param
				res.send('NOT IMPLEMENTED: Issue delete GET: ' + req.params.id);
			}).catch(function(err){
				console.log(err);
			});
		}
		else{
			res.status(401).render("errors/401");
		}
	}
	else{
		req.flash('info', 'Please Sign In to Delete An Issue!');
		res.redirect('/users/signin');
	}
};

// Handle Issue delete on POST.
exports.issue_delete_post = function(req, res) {
	req.flash('info', 'Please Sign In to Delete An Issue!');
  res.send('NOT IMPLEMENTED: Issue delete POST');
};

// Display Issue update form on GET.
exports.issue_update_get = function(req, res) {
	if(req.user){
		IssueModel.get(req.params.id).then(function(issue){
			if(req.user.id == issue.submitted_user || req.user.faculty || req.user.admin){
				res.send('NOT IMPLEMENTED: Issue update GET: ' + req.params.id);
			}
			else{
				res.status(401).render("errors/401");
			}
		}).catch(function(err){
			console.log(err);
		});
	}
	else{
		req.flash('info', 'Please Sign In to Edit An Issue!');
		res.redirect('/users/signin');
	}
};

// Handle Issue update on POST.
exports.issue_update_post = function(req, res) {
	if(req.user){
		IssueModel.get(req.params.id).then(function(issue){
			if(req.user.id == issue.submitted_user || req.user.faculty || req.user.admin){
				let attr = {};
				IssueModel.update(attr).then(function(result){
					//Data holds the information for the issue with the id param
					res.send('NOT IMPLEMENTED: Issue update POST: ' + req.params.id);
				}).catch(function(err){
					console.log(err);
				});
			}
			else{
				res.status(401).render("errors/401");
			}
		}).catch(function(err){
			console.log(err);
		});
	}
  else{
  	req.flash('info', 'Please Sign In to Edit An Issue!');
  	res.redirect('/users/signin');
  }
};