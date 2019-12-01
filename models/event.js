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

class Event {
	contructor(){}

	create(attr){
		return new Promise(function(resolve, reject){
			attr['location'] = req.body.location;
			attr['start_date'] = req.body.start_date;
			attr['end_date'] = req.body.end_date;
			attr['description'] = req.body.description;
			attr['submitted_user'] = req.user.id;
			attr['host'] = req.body.host;
			let query = `INSERT INTO events(location, start_date, end_date, description, \
			submitted_user, host) VALUE('${attr['location']}', '${attr['start_date']}', \
			'${attr['end_date']}', '${attr['description']}', '${attr['submitted_user']}', \
			'${attr['host']}')`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	update(attr){
		return new Promise(function(resolve, reject){
			let getEventQuery = `SELECT * FROM events WHERE id='${attr['id']}'`;
			databaseQuery(getEventQuery).then(function(result){
				let event = result[0];
				if(attr['location'] != null && attr['location'] != event.location){
					let locationQuery = `UPDATE events SET location='${attr['location']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(locationQuery).catch(function(err){
						console.log(err);
					});
				}
				//May Need to Adjust
				if(attr['start_date'] != null && attr['start_date'] != event.start_date){
					let startDateQuery = `UPDATE events SET start_date='${attr['start_date']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(startDateQuery).catch(function(err){
						console.log(err);
					});
				}
				//May Need to Adjust
				if(attr['end_date'] != null && attr['end_date'] != event.end_date){
					let endDateQuery = `UPDATE events SET end_date='${attr['end_date']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(endDateQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['description'] != null && attr['description'] != event.description){
					let descriptionQuery = `UPDATE events SET description='${attr['description']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(descriptionQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr['host'] != null && attr['host'] != event.host){
					let hostQuery = `UPDATE events SET host='${attr['host']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(hostQuery).catch(function(err){
						console.log(err);
					});
				}
			}).then(function(){
				resolve(1);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM events WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM events';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM events WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}
}

var EventModel = new Event();

module.exports = EventModel;