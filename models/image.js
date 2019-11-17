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
		return new Promise(function(resolve, reject){
			let query = `INSERT INTO images(name, description, type, size) \
					VALUE(\'${name}\', \'${description}\', \'${type}\', \'${size}\')`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	update(attr){// Short for Attributes
		return new Promise(function(resolve, reject){
			//Note done yet. Need to delete the image after updating it.
			let getImageQuery = `SELECT * FROM images WHERE id='${attr[id]}'`
			databaseQuery(getImageQuery).then(function(result){
				let image = result[0];
				if(attr[name] != issue.name){
					let nameQuery = `UPDATE images SET name='${attr[name]}'' WHERE id='${attr[id]}'`;
					databaseQuery(nameQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[description] != issue.description){
					let descriptionQuery = `UPDATE images SET description='${attr[description]}' WHERE id='${attr[id]}'`;
					databaseQuery(descriptionQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[type] != issue.type){
					let typeQuery = `UPDATE images SET type=${attr[type]} WHERE id='${attr[id]}'`;
					databaseQuery(typeQuery).catch(function(err){
						console.log(err);
					});
				}
				if(attr[size] != issue.size){
					let sizeQuery = `UPDATE images SET size=${attr[size]} WHERE id='${attr[id]}'`;
					databaseQuery(sizeQuery).catch(function(err){
						console.log(err);
					});
				}
			})
		});
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