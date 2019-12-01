"use strict";
var IssueModel = require('../models/issue');
const paginate = require('express-paginate');
const ImageModel = require('../models/image');

function isEmpty(obj) {
	for(var key in obj) {
	  if(obj.hasOwnProperty(key))
		return false;
	}
	return true;
  }

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
		res.status(500).render('errors/500');
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
			res.status(500).render('errors/500');
		});
	}).catch(function(err){
		console.log(err);
		res.status(500).render('errors/500');
	});
};

// Display detail page for a specific Issue.
exports.issue_detail = function(req, res) {
	IssueModel.get(req.params.id).then(function(data){
		
		//Data holds the information for the issue with the id param
		ImageModel.get(data.image_id).then(function(imgData){

			var imageSrcPath = (imgData != null) ? ImageModel.getPath(imgData.name) :
			"https://via.placeholder.com/180x180";

			res.render('pages/issues/show',
			{
				sessionUser: req.user,
				issue: data,
				imgFilePath: imageSrcPath,
				message: req.flash()
			});
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
		})	
	}).catch(function(err){
		console.log(err);
		res.status(500).render('errors/500');
	});
};

// Update Reported, Verified and Reolved Fields
exports.issue_detail_post = function(req, res){
	if(req.user){
		if(req.body.reported){
			IssueModel.get(req.params.id).then(function(issue){
				let attr = {
					id: req.params.id,
					reported: (issue.reported+1)
				}
				IssueModel.update(attr).then(function(){
					req.flash('success', 'This Issue Has Been Successfully Reported!');
					res.redirect(`/issues/issue/${req.params.id}`);
				}).catch(function(err){
					console.log(err);
					res.status(500).render('errors/500');
				});
			}).catch(function(err){
				console.log(err);
				res.status(500).render('errors/500');
			});
		}
	}
	else{
		req.flash('info', 'Please Sign-In To Access This Feature!');
		res.redirect('/users/signin');
	}
}

// Display Issue create form on GET.
exports.issue_create_get = function(req, res) {
	if(req.user){
		res.render('pages/issues/create',
	  {
		  sessionUser: req.user,
		  message: req.flash(),
		  imgFilePath: "https://via.placeholder.com/180x180"

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

		if(isEmpty(req.files)) {
			attr['image_id'] = null;
			IssueModel.create(attr).then(function(result){
				req.flash('success', 'Issue Successfully Reported!');
				res.redirect('/issues/create');	
			});
		}				
		else {
			ImageModel.upload(req.files.profile).then(function(result) {
				let newImageId = result.insertId;
				attr['image_id'] = newImageId;
			}).then(function(result){
				IssueModel.create(attr).then(function(result){
					req.flash('success', 'Issue Successfully Reported!');
					res.redirect('/issues/create');
				});		
			}).catch(function(err){
				console.log(err);
			});				
		}	
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
			res.status(403).render("errors/403");
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

				IssueModel.get(req.params.id).then(function(data){

					ImageModel.get(data.image_id).then(function(imgData){

						var imageSrcPath = (imgData != null) ? ImageModel.getPath(imgData.name) :
						"https://via.placeholder.com/180x180";

						//format to set the checkbox in the form
						data.verified = data.verified == 1 ? "checked" : "";
						data.resolved = data.resolved == 1 ? "checked" : "";
	
						res.render('pages/issues/update', {
							sessionUser: req.user,
							issue: data,
							imgFilePath: imageSrcPath
						}); 
					}).catch(function(err){
						console.log(err);
						res.status(500).render('errors/500');
					});
				}).catch(function(err){
					console.log(err);
					res.status(500).render('errors/500');
				});
			}
			else{
				res.status(403).render("errors/403");
			}
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
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

				//converting the values to the appropriate way it is stored in database
				//and to be compatible with checkbox selection
				req.body.verified = req.body.verified == 'on' ? 1 : 0;
				req.body.resolved = req.body.resolved == 'on' ? 1 : 0;

				attr['id'] = req.params.id;
				attr['title'] = req.body.title || null;
				attr['description'] = req.body.description || null;
				attr['location'] = req.body.location || null;
				attr['submitted_user'] = req.user.id || null;
				attr['verified'] = req.body.verified;
				attr['resolved'] = req.body.resolved;

				if(attr['verified'])
					attr['verified_faculty'] = req.user.id || null;

				if(attr['resolved'])
					attr['resolved_faculty'] = req.user.id || null;

				if(isEmpty(req.files)) {
					attr['image_id'] = null;
					IssueModel.update(attr).catch(function(err){
						console.log(err);
					});
					res.redirect(`/issues/issue/${req.params.id}`);	
				}				
				else {
					ImageModel.upload(req.files.profile).then(function(result) {
						let newImageId = result.insertId;
						attr['image_id'] = newImageId;
					}).then(function(result){
						IssueModel.update(attr).catch(function(err){
							console.log(err);
						});		
						res.redirect(`/issues/issue/${req.params.id}`);	
					}).catch(function(err){
						console.log(err);
					});				
				}		
			}
			else{
				res.status(403).render("errors/403");
			}
		}).catch(function(err){
			console.log(err);
			res.status(500).render('errors/500');
		});
	}
  else{
  	req.flash('info', 'Please Sign In to Edit An Issue!');
  	res.redirect('/users/signin');
  }
};