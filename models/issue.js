"use strict";
const pool = require('../lib/pool_db');

function databaseQuery(query){
	return new Promise(function(resolve, reject){
		pool.query(query, function(err, rows, fields){
			if(err)
				return reject(err);
			resolve(rows);
		});
	});
}

class Issue {
	contructor(){}

	create(attr){ //Needs to be done
		return new Promise(function(resolve, reject){
			let query = `INSERT INTO issues(title, description, location, submitted_user) \
			VALUE('${attr['title']}', '${attr['description']}', '${attr['location']}', ${attr['submitted_user']})`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	update(attr){// For Attribute
		return new Promise(function(resolve, reject){
			let getIssueQuery = `SELECT * FROM issues WHERE id='${attr['id']}'`
			databaseQuery(getIssueQuery).then(function(result){
				let issue = result[0];
				if(attr['image_id'] != null && attr['image_id'] != issue.image_id){
					let imageQuery = `UPDATE issues SET image_id='${attr['image_id']}' WHERE id='${attr['id']}'`;
					databaseQuery(imageQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['title'] != null && attr['title'] != issue.title){
					let titleQuery = `UPDATE issues SET title='${attr['title']}' WHERE id='${attr['id']}'`;
					databaseQuery(titleQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['description'] !=  null && attr['description'] != issue.description){
					let descriptionQuery = `UPDATE issues SET description='${attr['description']}' WHERE id='${attr['id']}'`;
					databaseQuery(descriptionQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['location'] !=  null && attr['location'] != issue.location){
					let locationQuery = `UPDATE issues SET location=${attr['location']} WHERE id='${attr['id']}'`;
					databaseQuery(locationQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['verified'] != null && attr['verified'] != issue.verified){
					let verifiedQuery = `UPDATE issues SET verified=${attr['verified']} WHERE id='${attr['id']}'`;
					databaseQuery(verifiedQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['resolved'] != null && attr['resolved'] != issue.resolved){
					let resolvedQuery = `UPDATE issues SET resolved='${attr['resolved']}' WHERE id='${attr['id']}'`;
					databaseQuery(resolvedQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['submitted_user'] != null && attr['submitted_user'] != issue.submitted_user){
					let submittedUserQuery = `UPDATE issues SET submitted_user='${attr['submitted_user']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(submittedUserQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['verified_faculty'] != null && attr['verified_faculty'] != user.verified_faculty){
					let verifiedFacultyQuery = `UPDATE issues SET verified_faculty='${attr['verified_faculty']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(verifiedFacultyQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['resolved_faculty'] != null && attr['resolved_faculty'] != user.resolved_faculty){
					let resolvedFacultyQuery = `UPDATE issues SET resolved_faculty='${attr['resolved_faculty']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(resolvedFacultyQuery).catch(function(err){
						console.log(err);
					});
				}
			})
		});
	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM issues WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM issues';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	allPaginate(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues ORDER BY ID DESC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	allCount(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT count(*) as numRows FROM issues';
			databaseQuery(query).then(function(results){
				resolve(results[0].numRows);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	getRecent(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues ORDER BY created_at DESC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}
}

var IssueModel = new Issue();

module.exports = IssueModel;