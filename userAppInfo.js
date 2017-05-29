var app = require('express')();
var fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
	extended: false
}))


app.set('views', 'Views');
app.set('view engine', 'pug');

// 
// Create one route:
// - renders a page that displays all your users.

app.get('/', (req, res) => {
	fs.readFile('./users.json', 'utf-8', function(err,data){

		var parseData = JSON.parse(data);
		res.render("usersInfo", {
			users: parseData
		});
	});
});


 
 
// Create two more routes:
// - renders a page that displays a form which is your search bar.
// - takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.

app.get('/search', (req, res) => {
	res.render('searchUsers')
})



app.post("/search", (req, res) => {
	fs.readFile('./users.json', 'utf-8', function(err, data){
	
		var input = req.body.input;
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

		res.render('findUsers', {
			first: firstname,
			last: lastname,
			email: email
		});
			
	});
});	

//Autocomplete Modify your form so that every time the user enters a key, 
//it makes an AJAX call that populates the search results. Do this work in a git 
//branch called "autocomplete". Then, merge this branch into master with a pull request.



app.post('/autocomplete', (req, res) => {
		var input = req.body.input;
		findUser(input,function(results){
			res.send(results);

		});
	});

function findUser(input, onComplete){
	fs.readFile('users.json', function(err, userdata){

		userdata = JSON.parse(userdata);
		
		userdata = userdata.map(function(user){
			return{
				firstname: user.firstname,
				lastname: user.lastname

			};	
		});

		var results = [];
		
		userdata.forEach(function(user){
			if (user.firstname.startsWith(input) || user.lastname.startsWith(input)) {
				results.push(user);
			};
		});

		onComplete(results);

	});	
};



// Create two more routes:
// - renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.


app.get('/register', (req, res) => {
	res.render('form');
});

//- takes in the post request from the 'create user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).

app.post('/register', (req, res) => {
	console.log(req.body);

	fs.readFile('./users.json', 'utf-8', function(err,data){
		
		parseData = JSON.parse(data);
		
		firstname = req.body.firstname;
	    lastname = req.body.lastname;
	    email = req.body.email;


	    newUser = {
	        firstname: req.body.firstname,
	        lastname: req.body.lastname,
	        email: req.body.email

   		};

        parseData.push(newUser)

        fs.writeFile('./users.json', JSON.stringify(parseData));
        res.redirect('/')
	  
    });
});



var listener = app.listen(3000, function(){
	console.log('userInfoApp listening on port:'  + listener.address().port)
});