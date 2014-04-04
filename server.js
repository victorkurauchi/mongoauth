// modules =================================================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

// var passport = require('passport');
// var flash    = require('connect-flash');

var pet      = require('./app/routes/pets');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.bodyParser()); 						// pull information from html in POST
	app.use(express.methodOverride()); 					// simulate DELETE and PUT

  // required for passport
  // app.use(express.session({ secret: 'kznfitness' })); // session secret
  // app.use(passport.initialize());
  // app.use(passport.session()); // persistent login sessions
  // app.use(flash()); // use connect-flash for flash messages stored in session
});

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes
//require('./config/passport')(passport); // pass passport for configuration

app.get('/api/pets', pet.list);
app.post('/api/pets', pet.create);
app.get('/api/pets/:id', pet.retrieve);
app.put('/api/pets/:id', pet.update);
app.delete('/api/pets/:id', pet.delete);

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app