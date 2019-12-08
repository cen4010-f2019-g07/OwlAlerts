"use strict";
if(process.env.test){
	delete require.cache[require.resolve('../lib/pool_db')];
}
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

function getVerifiedFaculty(id){
	return new Promise(function(resolve, reject){
		let verifiedQuery = `SELECT * FROM users WHERE id=${id}`;
		databaseQuery(verifiedQuery).then(function(verifiedResult){
			resolve(verifiedResult[0]);
		}).catch(function(err){
			reject(err);
		});
	});
}

function conditionalVerified(issue){
	return new Promise(function(resolve, reject){
		if(issue.verified){
			resolve(getVerifiedFaculty(issue.verified_faculty));
		}
		else{
			resolve(null);
		}
	});
}

function getResolvedFaculty(id){
	return new Promise(function(resolve, reject){
		let resolvedQuery = `SELECT * FROM users WHERE id=${id}`;
		databaseQuery(resolvedQuery).then(function(resolvedResult){
			resolve(resolvedResult[0]);
		}).catch(function(err){
			reject(err);
		});
	});
}

function conditionalResolved(issue){
	return new Promise(function(resolve, reject){
		if(issue.resolved){
			resolve(getResolvedFaculty(issue.resolved_faculty));
		}
		else{
			resolve(null);
		}
	});
}

class Issue {
	contructor(){}

	create(attr){ //Needs to be done
		return new Promise(function(resolve, reject){
			let query = `INSERT INTO issues(title, description, location, submitted_user, image_id, created_at) \
			VALUE('${attr['title']}', '${attr['description']}', '${attr['location']}', ${attr['submitted_user']}, \
			${attr['image_id']}, null)`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
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
						reject(err);
					});
				}
				if(attr['title'] != null && attr['title'] != issue.title){
					let titleQuery = `UPDATE issues SET title='${attr['title']}' WHERE id='${attr['id']}'`;
					databaseQuery(titleQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['description'] !=  null && attr['description'] != issue.description){
					let descriptionQuery = `UPDATE issues SET description='${attr['description']}' WHERE id='${attr['id']}'`;
					databaseQuery(descriptionQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['location'] !=  null && attr['location'] != issue.location){
					let locationQuery = `UPDATE issues SET location='${attr['location']}' WHERE id='${attr['id']}'`;
					databaseQuery(locationQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['verified'] != null && attr['verified'] != issue.verified){
					let verifiedQuery = `UPDATE issues SET verified=${attr['verified']} WHERE id='${attr['id']}'`;
					databaseQuery(verifiedQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['resolved'] != null && attr['resolved'] != issue.resolved){
					let resolvedQuery = `UPDATE issues SET resolved='${attr['resolved']}' WHERE id='${attr['id']}'`;
					databaseQuery(resolvedQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr.reported != null && attr.reported != issue.reported){
					let reportedQuery = `UPDATE issues SET reported=${attr.reported} WHERE id=${attr['id']}`;
					databaseQuery(reportedQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['submitted_user'] != null && attr['submitted_user'] != issue.submitted_user){
					let submittedUserQuery = `UPDATE issues SET submitted_user='${attr['submitted_user']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(submittedUserQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['verified_faculty'] != null && attr['verified_faculty'] != issue.verified_faculty){
					let verifiedFacultyQuery = `UPDATE issues SET verified_faculty='${attr['verified_faculty']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(verifiedFacultyQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['resolved_faculty'] != null && attr['resolved_faculty'] != issue.resolved_faculty){
					let resolvedFacultyQuery = `UPDATE issues SET resolved_faculty='${attr['resolved_faculty']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(resolvedFacultyQuery).catch(function(err){
						reject(err);
					});
				}
			}).then(function(){
				resolve(1);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM issues WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM issues';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allPaginate(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues ORDER BY ID DESC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allUnverified(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues WHERE verified=false ORDER BY created_at ASC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allVerified(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues WHERE verified=true ORDER BY created_at ASC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allResolved(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues WHERE resolved=true ORDER BY created_at ASC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allCount(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT count(*) as numRows FROM issues';
			databaseQuery(query).then(function(results){
				resolve(results[0].numRows);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				return result[0];
			}).then(function(issue){
				let subUserQuery = `SELECT * FROM users WHERE id=${issue.submitted_user}`;
				databaseQuery(subUserQuery).then(function(subUserResult){
					issue.subUser = subUserResult[0];
					return issue;
				}).then(function(issue){
					conditionalVerified(issue).then(function(vFaculty){
						issue.vFaculty = vFaculty;
						return issue;
					}).then(function(issue){
						conditionalResolved(issue).then(function(rFaculty){
							issue.rFaculty = rFaculty;
							resolve(issue);
						}).catch(function(err){
							reject(err);
						});
					}).catch(function(err){
						reject(err);
					});
				}).catch(function(err){
					reject(err);
				});
			}).catch(function(err){
				reject(err);
			});
		});
	}

	getRecent(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM issues ORDER BY created_at DESC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	closeDB(){
		return new Promise(function(resolve, reject){
			pool.end();
			resolve(1);
		});
	}
}

var IssueModel = new Issue();

module.exports = IssueModel;