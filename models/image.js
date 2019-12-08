"use strict";
if(process.env.test){
	delete require.cache[require.resolve('../lib/pool_db')];
}
const pool = require('../lib/pool_db');
var fs = require('fs');

let imageSaveDir = '/resources/';
let imageSaveDirectory = __basedir + '/public' + imageSaveDir;

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
			let query = `INSERT INTO images(name, description, type, size, created_at) \
					VALUE(\'${name}\', \'${description}\', \'${type}\', \'${size}\'), null`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	getPath(imgFileName) {
		return imageSaveDir + imgFileName;
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
						reject(err);
					});
				}
				if(attr[description] != issue.description){
					let descriptionQuery = `UPDATE images SET description='${attr[description]}' WHERE id='${attr[id]}'`;
					databaseQuery(descriptionQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr[type] != issue.type){
					let typeQuery = `UPDATE images SET type=${attr[type]} WHERE id='${attr[id]}'`;
					databaseQuery(typeQuery).catch(function(err){
						reject(err);
					});
				}
				if(attr[size] != issue.size){
					let sizeQuery = `UPDATE images SET size=${attr[size]} WHERE id='${attr[id]}'`;
					databaseQuery(sizeQuery).catch(function(err){
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
			let getQuery = `SELECT * FROM images WHERE id=${id}`;
			let deleteQuery = `DELETE FROM images WHERE id='${id}'`;
			databaseQuery(getQuery).then(function(result){
				let image = result[0];
				let filePath = imageSaveDirectory + image.name;
				fs.unlinkSync(filePath);
			}).then(function(){
				databaseQuery(deleteQuery).then(function(result){
					resolve(result);
				}).catch(function(err){
					reject(err);
				});
			}).catch(function(err){
				reject(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM images WHERE id='${id}'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				reject(err);
			});
		});
	}

	upload(imageFile){

		return new Promise(function(resolve, reject){
			//to append timestamp before the extension
			let newFileName = imageFile.name.replace(".", "_" + Date.now()+".");

			//create image directory if does not exist
			if(!fs.existsSync(imageSaveDirectory)){
				fs.mkdirSync(imageSaveDirectory);
			}

			//move the imgae file to directory on server
			imageFile.mv(imageSaveDirectory + newFileName);
	
			let query = `INSERT INTO images(name, description, type, size) \
					VALUE(\'${newFileName}\', \'${"sample image"}\', \'${imageFile.mimetype}\', \'${imageFile.data.length}\')`;

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

var ImageModel = new Image();

module.exports = ImageModel;