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

class Garage {
	contructor(){}

	create(attr){
		return new Promise(function(resolve, reject){
			let query = `INSERT INTO garages(location, name, full, free_spots, total_spots, created_at) \
			VALUE('${attr['location']}', '${attr['name']}', ${attr['full']}, ${attr['free_spots']}, \
			${attr['total_spots']}, null)`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	update(attr){
		return new Promise(function(resolve, reject){
			let getGarageQuery = `SELECT * FROM garages WHERE id='${attr['id']}'`;
			databaseQuery(getGarageQuery).then(function(result){
				let garage = result[0];
				if(attr['location'] != null && attr['location'] != garage.location){
					let locationQuery = `UPDATE garages SET location='${attr['location']}' \
					WHERE id='${attr['id']}'`;
					databaseQuery(locationQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['name'] != null && attr['name'] != garage.name){
					let nameQuery = `UPDATE garages SET name='${attr['name']}' WHERE id='${attr['id']}'`;
					databaseQuery(nameQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['full'] != null && attr['full'] != garage.full){
					let fullQuery = `UPDATE garages SET full=${attr['full']} WHERE id='${attr['id']}'`;
					databaseQuery(fullQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['free_spots'] != null && attr['free_spots'] != garage.free_spots){
					let freeSpotsQuery = `UPDATE garages SET free_spots=${attr['free_spots']} \
					WHERE id='${attr['id']}'`;
					databaseQuery(freeSpotsQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr['total_spots'] != null && attr['total_spots'] != garage.total_spots){
					let totalSpotsQuery = `UPDATE garages SET total_spots=${attr['total_spots']} \
					WHERE id='${attr['id']}'`;
					databaseQuery(totalSpotsQuery).catch(function(err){
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
			let query = `DELETE FROM garages WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM garages';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM garages WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				reject(err);
			});
		});
	}
}

var GarageModel = new Garage();

module.exports = GarageModel;