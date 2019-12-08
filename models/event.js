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

class Event {
	contructor(){}

	create(attr){
		return new Promise(function(resolve, reject){
			let query = `INSERT INTO events(title, location, start_date, end_date, description, \
			submitted_user, host, created_at) VALUE('${attr.title}', '${attr['location']}', '${attr['start_date']}', \
			'${attr['end_date']}', '${attr['description']}', ${attr['submitted_user']}, \
			'${attr['host']}', null)`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	update(attr){
		return new Promise(function(resolve, reject){
			let getEventQuery = `SELECT * FROM events WHERE id='${attr['id']}'`;
			databaseQuery(getEventQuery).then(function(result){
				let event = result[0];
				if(attr['title'] != null && attr['title'] != event.title){
					let titleQuery = `UPDATE events SET title='${attr['title']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(titleQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['location'] != null && attr['location'] != event.location){
					let locationQuery = `UPDATE events SET location='${attr['location']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(locationQuery).catch(function(err){
						reject(err);
					});
				}
				//May Need to Adjust
				if(attr['start_date'] != null && attr['start_date'] != event.start_date){
					let startDateQuery = `UPDATE events SET start_date='${attr['start_date']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(startDateQuery).catch(function(err){
						reject(err);
					});
				}
				//May Need to Adjust
				if(attr['end_date'] != null && attr['end_date'] != event.end_date){
					let endDateQuery = `UPDATE events SET end_date='${attr['end_date']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(endDateQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['description'] != null && attr['description'] != event.description){
					let descriptionQuery = `UPDATE events SET description='${attr['description']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(descriptionQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['host'] != null && attr['host'] != event.host){
					let hostQuery = `UPDATE events SET host='${attr['host']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(hostQuery).catch(function(err){
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
			let query = `DELETE FROM events WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM events';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allPaginate(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM events ORDER BY ID DESC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	allCount(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT count(*) as numRows FROM events';
			databaseQuery(query).then(function(results){
				resolve(results[0].numRows);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM events WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	getUpcoming(limit){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM events WHERE start_date >= CURDATE() ORDER BY start_date ASC LIMIT ${limit}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	endPool(){
		return new Promise(function(resolve, reject){
			pool.end();
			resolve(1);
		});
	}
}

var EventModel = new Event();

module.exports = EventModel;