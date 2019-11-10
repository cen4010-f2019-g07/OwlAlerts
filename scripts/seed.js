const mysql = require('mysql');
const faker = require('faker');
const production = process.env.production || false;
const issuesCount = process.env.issues || 0;
const eventsCount = process.env.events || 0;
const usersCount = process.env.users || 0;
const garagesCount = process.env.garages || 0;
var connection;

function twoDigits(d){
	if(0 <= d && d < 10) return "0" + d.toString();
	if(-10 < d ** d < 0) return "-0" + (-1*d).toString();
	return d.toString();
}

Date.prototype.toMysqlFormat = function(){
	return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + 
	twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + 
	":" + twoDigits(this.getUTCSeconds());
}

if(production == true){
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'cen4010fal19_g07',
		password: 'kJDrofNeU6',
		database: 'cen4010fal19_g07'
	});
	console.log('Connected to Production Database!');
}
else{
	connection = mysql.createConnection({
		host: 'localhost',
		user: 'user',
		password: 'password',
		database: 'owl_alerts'
	});
	console.log('Connected to Development Database!');
}

//Seeds the Database with Records
connection.connect(function(error){
	if(error) throw error;
	//Seeds the Database with User Records
	for(let i = 0; i < usersCount; i++){
		let residency_values = ['Out-State', 'In-State'];
		let residency = residency_values[Math.round(Math.random())];
		let bool_selection_values = ['commuter', 'dormer', 'faculty']
		let bool_selection = bool_selection_values[Math.round(Math.random()*2)];
		let building_values = ['IVAS', 'IVAN', 'UVA 57', 'UVA 58', 'UVA 59', 'UVA 60', 
		'UVA 61', 'PAR', 'HPT', 'GPT', 'IRT'];
		let building = '';
		let counter = 0;
		let uva_rooms = [];
		for(let i = 0; i < 2; i++){
			for(let j = 0; j < 30; j++){
				format_j = ('0' + j).slice(-2);
				uva_rooms[counter] = `${i+1}${format_j}`;
				counter++;
			}
		}
		let iva_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 70; j++){
				format_j = ('0' + j).slice(-2);
				iva_rooms[counter] = `${i+1}${format_j}`;
				counter++;
			}
		}
		let par_rooms = [];
		counter = 0;
		for(let i = 0; i < 5; i++){
			for(let j = 0; j < 30; j++){
				format_j = ('0' + j).slice(-2);
				par_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let hpt_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){419
			for(let j = 0; j < 60; j++){
				format_j = ('0' + j).slice(-2);
				hpt_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let gpt_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 60; j++){
				format_j = ('0' + j).slice(-2);
				gpt_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let irt_rooms = [];
		counter = 0;
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 60; j++){
				format_j = ('0' + j).slice(-2);
				irt_rooms[counter] = `${i+1}${format_j}`;
				counter++
			}
		}
		let room_number = '';
		if(bool_selection == 'dormer'){
			building = building_values[Math.round(Math.random()*10)];
			switch(building){
				case 'PAR':
					room_number = par_rooms[Math.round(Math.random()*149)]
					break;
				case 'UVA 57':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 58':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 59':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 60':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'UVA 61':
					room_number = uva_rooms[Math.round(Math.random()*59)]
					break;
				case 'IRT':
					room_number = irt_rooms[Math.round(Math.random()*419)]
					break;
				case 'HPT':
					room_number = hpt_rooms[Math.round(Math.random()*419)]
					break;
				case 'GPT':
					room_number = gpt_rooms[Math.round(Math.random()*419)]
					break;
				case 'IVAS':
					room_number = iva_rooms[Math.round(Math.random()*489)]
					break;
				case 'IVAN':
					room_number = iva_rooms[Math.round(Math.random()*489)]
					break;
				default:
					console.log('Room Switch Statment Not Working!');
			}
		}
		let address = faker.fake("{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}");
		let phone_number = faker.phone.phoneNumber();
		let email = faker.internet.email();
		let firstname = faker.name.firstName();
		let lastname = faker.name.lastName();

		let user = `INSERT INTO users(residency, ${bool_selection}, building, room_number, address, \
		phone_number, email, firstname, lastname) VALUE(\"${residency}\", true, \"${building}\", \
		\"${room_number}\", \"${address}\", \"${phone_number}\", \"${email}\", \"${firstname}\", \"${lastname}\")`;

		connection.query(user, function(err, rows, fields){
			if(err) throw err;
			console.log('---------------------------------------------------');
			console.log(`User Residency for Record ${i+1}: ${residency}`);
			console.log(`User ${bool_selection} for Record ${i+1}: ${true}`);
			if(bool_selection == 'dormer'){
				console.log(`User Building for Record ${i+1}: ${building}`);
				console.log(`User Room Number for Record ${i+1}: ${room_number}`);
			}
			console.log(`User Address for Record ${i+1}: ${address}`);
			console.log(`User Phone Number for Record ${i+1}: ${phone_number}`);
			console.log(`User Email for Record ${i+1}: ${email}`);
			console.log(`User First Name for Record ${i+1}: ${firstname}`);
			console.log(`User Last Name for Record ${i+1}: ${lastname}`);
			console.log(`User Record ${i+1} Created!`);
		});
	};

	//Seeds the Database with Garage Records
	for(let i = 0; i < garagesCount; i++){
		let location = `${faker.address.streetAddress()}, Boca Raton, FL 33043`;
		let name = faker.company.companyName();
		let full_values = [true, false];
		let full = full_values[Math.round(Math.random()*1)];
		let free_spots = 0;
		let total_spots_values = [400, 500, 600];
		let total_spots = total_spots_values[Math.round(Math.random()*2)];

		let garage = `INSERT INTO garages(location, name, full, free_spots, total_spots) \
		VALUE(\"${location}\", \"${name}\", ${full}, ${free_spots}, ${total_spots})`;

		connection.query(garage, function(err, rows, fields){
			if(err) throw err;
			console.log('---------------------------------------------------');
			console.log(`Garage Location for Record ${i+1}: ${location}`);
			console.log(`Garage Name for Record ${i+1}: ${name}`);
			console.log(`Garage Full Status for Record ${i+1}: ${full}`);
			console.log(`Garage Free Spots for Record ${i+1}: ${free_spots}`);
			console.log(`Garage Total Spots for Record ${i+1}: ${total_spots}`);
			console.log(`Garage Record ${i+1} Created!`);
		});
	}

	//Seeds the Database with Event Records
	for(let i = 0; i < eventsCount; i++){
		let location = `${faker.lorem.words()} Hall, Boca Campus`;
		let dates_values = [faker.date.past(), faker.date.recent(), faker.date.future()];
		let date = dates_values[Math.round(Math.random()*2)];
		let start_date = date.toMysqlFormat();
		date.setHours(date.getHours() + 2);
		let end_date = date.toMysqlFormat();
		let description = faker.lorem.text();
		let host = faker.company.companyName();
		let user_ids = [];
		let submitted_user;
		let events;
		connection.query('SELECT * FROM users WHERE faculty=true', function(err1, rows1, fields1){
			if(err1) throw err1;
			for(let j in rows1){
				user_ids[j] = rows1[j].id;
			}
			submitted_user = user_ids[Math.round(Math.random()*(user_ids.length-1))];
			events = `INSERT INTO events(location, start_date, end_date, description, host, submitted_user) \
			VALUE(\"${location}\", \"${start_date}\", \"${end_date}\", \"${description}\", \"${host}\", ${submitted_user})`;

			connection.query(events, function(err2, rows2, fields2){
				if(err2) throw err2;
				console.log('---------------------------------------------------');
				console.log(`Event Location for Record ${i+1}: ${location}`);
				console.log(`Event Start Date for Record ${i+1}: ${start_date}`);
				console.log(`Event End Date for Record ${i+1}: ${end_date}`);
				console.log(`Event Description for Record ${i+1}: ${description}`);
				console.log(`Event Host for Record ${i+1}: ${host}`);
				console.log(`Event Submitted User Id for Record ${i+1}: ${submitted_user}`);
				console.log(`Event Record ${i+1} Created!`);
			});		
		});
	}

	//Seeds the Database with Issue Records
	for(let i = 0; i < issuesCount; i++){
		let description = faker.lorem.text();
		let location_values = ['IVAS', 'IVAN', 'UVA 57', 'UVA 58', 'UVA 59', 'UVA 60', 
		'UVA 61', 'PAR', 'HPT', 'GPT', 'IRT', `${faker.lorem.words()} Hall, Boca Campus`];
		let location = location_values[Math.round(Math.random()*11)];
		let verified_values = [true, false, false, false];
		let verified = verified_values[Math.round(Math.random()*3)];
		let resolved_values = [true, false, false];
		let resolved = false;
		if(verified){
			resolved = resolved_values[Math.round(Math.random()*2)];
		}
		let submitted_user_values = [];
		let submitted_user;
		let verified_faculty_values = [];
		let verified_faculty = null;
		let resolved_faculty_values = [];
		let resolved_faculty = null;

		connection.query('SELECT * FROM users', function(err1, rows1, fields1){
			if(err1) throw err1;
			for(let j in rows1){
				submitted_user_values[j] = rows1[j].id;
			}
			submitted_user = submitted_user_values[Math.round(Math.random()*(submitted_user_values.length-1))];
			if(verified == true){
				connection.query('SELECT * FROM users WHERE faculty=true', function(err2, rows2, fields2){
					if(err2) throw err2;
					for(let k in rows2){
						verified_faculty_values[k] = rows2[k].id;
					}
					verified_faculty = verified_faculty_values[Math.round(Math.random()*(verified_faculty_values.length-1))];
					if(resolved){
						connection.query('SELECT * FROM users WHERE faculty=true', function(err3, rows3, fields3){
							if(err3) throw err3;
							for(let l in rows3){
								resolved_faculty_values[l] = rows3[l].id;
							}
							resolved_faculty = resolved_faculty_values[Math.round(Math.random()*(resolved_faculty_values.length-1))];
						});
					}
				});
			}
			let issues = `INSERT INTO issues(description, location, verified, resolved, submitted_user, verified_faculty \
			resolved_faculty) VALUE(\"${description}\", \"${location}\", ${verified}, ${resolved}, ${submitted_user}, \
			${verified_faculty}, ${resolved_faculty})`;

			console.log('---------------------------------------------------');
			console.log(`Issue Description for Record ${i+1}: ${description}`);
			console.log(`Issue Location for Record ${i+1}: ${location}`);
			console.log(`Issue Verified for Record ${i+1}: ${verified}`);
			console.log(`Issue Resolved for Record ${i+1}: ${resolved}`);
			console.log(`Issue Submitted User Id for Record ${i+1}: ${submitted_user}`);
			console.log(`Issue Verified Faculty User Id for Record ${i+1}: ${verified_faculty}`);
			console.log(`Issue Resolved Faculty User Id for Record ${i+1}: ${resolved_faculty}`);
			console.log(`Issue Record ${i+1} Created!`);
			/*
			connection.query(issues, function(err4, rows4, fields4){
				if(err4) throw err4;
				console.log('---------------------------------------------------');
				console.log(`Issue Description for Record ${i+1}: ${description}`);
				console.log(`Issue Location for Record ${i+1}: ${location}`);
				console.log(`Issue Verified for Record ${i+1}: ${verified}`);
				console.log(`Issue Resolved for Record ${i+1}: ${resolved}`);
				console.log(`Issue Submitted User Id for Record ${i+1}: ${submitted_user}`);
				console.log(`Issue Verified Faculty User Id for Record ${i+1}: ${verified_faculty}`);
				console.log(`Issue Resolved Faculty User Id for Record ${i+1}: ${resolved_faculty}`);
				console.log(`Issue Record ${i+1} Created!`);
			});
			*/
		});
	}
});
return;