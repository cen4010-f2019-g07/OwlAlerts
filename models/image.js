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

class Image {
	contructor(){}

	create(name, description, type, size){

	}

	update(){

	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM images WHERE id='${id}'`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM images WHERE id='${id}'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}
}

var ImageModel = new Image();

module.exports = ImageModel;