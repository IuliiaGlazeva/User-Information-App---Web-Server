var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



app.set('views', 'views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded (
	{extended: true}));

app.get('/', (req, res) => {
	res.render('usersInfo');

});

app.get('/searchUsers', (req, res) =>{
	res.render('searchUsers');
});



app.post('/searchUsers', (req, res) => {
	res.render('searchUsers');
});


app.post('/autocomplete', (req, res) =>{
		var input = req.body.input;
		
	fs.readFile('users.json', function(err, userdata){
		userdata = JSON.parse(userdata);
		// search function:
		
		userdata = userdata.map(function(user){
			return{
				firstname: user.firstname,
				lastname: user.lastname

			};
			
		});
		console.log(userdata);

		var results = [];
		
		userdata.forEach(function(user){
			if (user.firstname.startsWith(input) || user.lastname.startsWith(input)) {
				results.push(user);
			}

		});

		res.send(results);


	})
	
});

app.listen(3000, function(){
	console.log('UserInfoApp listening on port 3000!')

});