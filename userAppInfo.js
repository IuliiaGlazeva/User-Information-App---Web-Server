var app = require('express')();
var fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
	extended: false
}))


app.set('views', 'Views');
app.set('view engine', 'pug');

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.

app.get('/', (request, response) => {
	fs.readFile('./users.json', 'utf-8', function(err,data){
		if(err){
			throw err;
		}


		var parseData = JSON.parse(data);
		
		response.render("usersInfo", {
			users: parseData
		});
	});
});


// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is your search bar.
// - route 3: takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.

app.get('/search', (request, response) => {
	response.render('searchUsers')
})

app.post('/search', (request, response) => {
	fs.readFile('./users.json', 'utf-8', function(err, data){
		if (err) {
			throw err;
		}

		var input = request.body.name;
		var users = JSON.parse(data);


		for (var i = 0; i < users.length; i++) {

			if (input === users[i].firstname) {

				var firstname = users[i].firstname;
				var lastname = users[i].lastname;
				var email = users[i].email;
			} else if(input === users[i].lastname){

				var firstname = users[i].firstname;
				var lastname = users[i].lastname;
				var email = users[i].email;

			} else if (input === users[i].firstname + " " + users[i].lastname) {

				var firstname = users[i].firstname;
				var lastname = users[i].lastname;
				var email = users[i].email;
			}

		};

			response.render('findUsers', {
			first: firstname,
			last: lastname,
			email: email
		});
	});	
});


// Part 2
// Create two more routes:
// - route 4: renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.


app.get('/register', (request, response) => {
	response.render('form');
});

//- route 5: takes in the post request from the 'create user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).

app.post('/register', (request, response) => {
	console.log(request.body);

	fs.readFile('./users.json', 'utf-8', function(err,data){
		if(err){
			throw err;
		}

		parseData = JSON.parse(data);
		

        
		firstname = request.body.firstname;
	    lastname = request.body.lastname;
	    email = request.body.email;



	    newUser = {
	        firstname: request.body.firstname,
	        lastname: request.body.lastname,
	        email: request.body.email

    };

        parseData.push(newUser)

        fs.writeFile('./users.json', JSON.stringify(parseData));
        response.redirect('/')
	  
      });
   });



var listener = app.listen(3000, function(){
	console.log('userInfoApp listening on port:'  + listener.address().port)
});
