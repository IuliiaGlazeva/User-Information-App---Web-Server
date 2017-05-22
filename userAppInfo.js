var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.set('views', 'views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded (
	{extended: true}));

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

app.get('/searchUsers', (req, res) =>{
	res.render('searchUsers');
});


app.post('/autocomplete', (req, res) =>{
		var input = req.body.input;
		findUser(input,function(results){
			res.send(results);

		});
	});
function findUser(input, onComplete){
	fs.readFile('users.json', function(err, userdata){
		userdata = JSON.parse(userdata);
		// search function:
		
		userdata = userdata.map(function(user){
			return{
				firstname: user.firstname,
				lastname: user.lastname

			};
			
		});
		//!console.log(userdata);

		var results = [];
		
		userdata.forEach(function(user){
			if (user.firstname.startsWith(input) || user.lastname.startsWith(input)) {
				results.push(user);
			}

		});

		onComplete(results);


	})
	

}

app.listen(3000, function(){
	console.log('UserInfoApp listening on port 3000!')

});