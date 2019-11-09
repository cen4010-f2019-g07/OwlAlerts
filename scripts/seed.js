const mysql = require('mysql');
const faker = require('faker');
const production = process.env.production || false;
const issuesCount = process.env.issues || 0;
const eventsCount = process.env.events || 0;
const usersCount = process.env.users || 0;
const garagesCount = process.env.garages || 0;
var connection;

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
connection.connect(function(err){
	if(err) throw err;
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
		});
	}

	//Seeds the Database with Event Records
	for(let i = 0; i < eventsCount; i++){
		
	}

	//Seeds the Database with Issue Records
	for(let i = 0; i < issuesCount; i++){
		
	}

	connection.end();
	return;
});
/*
var createIssue1 = "INSERT INTO issues(description, location) VALUE(\'The toilet is clogged\', \
\'In Parliament 1st Floor Bathroom\')";
var createIssue2 = "INSERT INTO issues(description, location, verified) VALUE(\
\'The leftmost elevator cab is not working\', \'IVAS Lobby\', true)";
var createIssue3 = "INSERT INTO issues(description, location, verified, resolved) \
VALUE(\'TV in IVAN Lobby displaying Error\', \'IVAN Lobby\', true, true)";

var createEvent1 = "INSERT INTO events(location, start_date, end_date, description, host) \
VALUE(\'Palmetto Oaks Room\', \'2019-11-01 18:00:00\', \'2019-11-01 19:30:00\', \'Social with free food\', \'Cool Socials\')";
var createEvent2 = "INSERT INTO events(location, start_date, end_date, description, host) \
VALUE(\'Live Oak Room\', \'2019-11-04 15:00:00\', \'2019-11-04 16:00:00\', \'Informal Resume Review\', \'Resume Reviews\')";

var createUser1 = "INSERT INTO users(residency, commuter, phone_number, address, email, \
firstname, lastname) VALUE(\'In-State\', true, \'(987) 123-4567\', \'70 Glades Road, Boca \
Raton, FL 33302\', \'studentemail1@fau.edu\', \'John\', \'Doe\')";
var createUser2 = "INSERT INTO users(residency, dormer, phone_number, address, email, \
firstname, lastname) VALUE(\'Out-State\', true, \'(123) 456-7890\', \'Parliament Room 316, \
Boca Raton, FL 33302\', \'studentemail2@fau.edu\', \'Jane\', \'Smith\')";

var createGarage1 = "INSERT INTO garages(location, name, free_spots, total_spots) \
VALUE(\'60 University Road, Boca Raton, FL 33302\', \'Garage 1\', 400, 400)";
var createGarage2 = "INSERT INTO garages(location, name, free_spots, total_spots) \
VALUE(\'40 Lucia Ave, Boca Raton, FL 33303\', \'Garage 2\', 400, 400)";

connection.query(createIssue1, function(err, rows, fields){
	if(err) throw err;
	console.log("Issue Record 1 has been Created!");
});

connection.query(createIssue2, function(err, rows, fields){
	if(err) throw err;
	console.log("Issue Record 2 has been Created!");
});

connection.query(createIssue3, function(err, rows, fields){
	if(err) throw err;
	console.log("Issue Record 3 has been Created!");
});

connection.query(createEvent1, function(err, rows, fields){
	if(err) throw err;
	console.log("Event Record 1 has been Created!");
});

connection.query(createEvent2, function(err, rows, fields){
	if(err) throw err;
	console.log("Event Record 2 has been Created!");
});

connection.query(createUser1, function(err, rows, fields){
	if(err) throw err;
	console.log("User Record 1 has been Created!");
});

connection.query(createUser2, function(err, rows, fields){
	if(err) throw err;
	console.log("User Record 2 has been Created!");
});

connection.query(createGarage1, function(err, rows, fields){
	if(err) throw err;
	console.log("Garage Record 1 has been Created!");
});

connection.query(createGarage2, function(err, rows, fields){
	if(err) throw err;
	console.log("Garage Record 2 has been Created!");
});
*/