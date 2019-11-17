const pool = require('../lib/pool_db');
var fs = require('fs');

let userImageSaveDir = '/resources/user_images/';
let userProfileImageDirectory = __basedir + '/public' + userImageSaveDir;


function databaseQuery(query){
	return new Promise(function(resolve, reject){
		pool.query(query, function(err, rows, fields){
			if(err)
				return reject(err);
			resolve(rows);
		});
	});
}

class User {
	contructor(){}

	create(firstname, lastname, email, password){
		return new Promise(function(resolve, reject){
			let query = `INSERT INTO users(firstname, lastname, email, password) \
					VALUE(\'${firstname}\', \'${lastname}\', \'${email}\', \'${password}\')`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	update(userId, profileImageId){
		return new Promise(function(resolve, reject){
			let query = `UPDATE users \
					SET image_id = \'${profileImageId}'\
					WHERE id= \'${userId}\'`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	upload(image){

		return new Promise(function(resolve, reject){

			//to append timestamp before the extension
			let newFileName = image.name.replace(".", "_" + Date.now()+".");

			//create image directory if does not exist
			if(!fs.existsSync(userProfileImageDirectory)){
				fs.mkdirSync(userProfileImageDirectory);
			}

			//move the imgae file to directory on server
			image.mv(userProfileImageDirectory + newFileName);
	
			let query = `INSERT INTO images(name, description, type, size) \
					VALUE(\'${newFileName}\', \'${"sample image"}\', \'${image.mimetype}\', \'${image.data.length}\')`;

			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	delete(id){
		return new Promise(function(resolve, reject){
			let query = `DELETE FROM users WHERE id=${id}`;
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	all(){
		return new Promise(function(resolve, reject){
			let query = 'SELECT * FROM users';
			databaseQuery(query).then(function(result){
				resolve(result);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	get(id){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM users WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	getProfileImage(id) {
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM images WHERE id=\'${id}\'`;
			databaseQuery(query).then(function(result){
				resolve(result[0]);
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	checkEmail(email){
		return new Promise(function(resolve, reject){
			let query = `SELECT * FROM users WHERE email=\'${email}\'`;
			databaseQuery(query).then(function(result){
				if(result > 0){
					resolve(false);
				}
				else{
					resolve(true);
				}
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	getUserProfileImagePath(imgFileName) {
		return userImageSaveDir + imgFileName;
	}
}

var UserModel = new User();

module.exports = UserModel;