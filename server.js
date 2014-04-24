// modules
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var path     = require('path');
var user     = require('./app/routes/users');
var session  = require('express-session');

// configuration
var db   = require('./config/db');
var port = process.env.PORT || 3000;
mongoose.connect(db.url);

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use(express.cookieParser());
app.use(express.session({ secret: 'secretttttttt' }));

app.use(function(req, res, next) {

  res.locals.loggedIn = req.session.user ? true : false;
  res.locals.loggedUser = req.session.user ? req.session.user : null;
  next();
})

app.use(app.router);

// API
app.get('/api/user', user.list);
app.post('/api/user', user.create);
app.get('/api/user/:id', user.retrieve);
app.put('/api/user/:id', user.update);
app.delete('/api/user/:id', user.delete);

// Views
app.get('/', function(req, res) {
  res.render('index');
});

// user
app.get('/usuario', user.list);
app.get('/user/update/:id', user.showUpdate);

// account
app.get('/account', function(req, res) {
  res.render('section/account', {usuario: res.locals.loggedUser});
});

// signup
app.post('/signup', user.signup);

// login
app.get('/login', function(req, res) {
  res.render('section/login');
});

app.post('/login', user.login);

app.get('/logout', function(req, res) {
  req.session.user = null;
  req.session.destroy(function() {});
  res.redirect('/');
})

// start app
app.listen(port);	
console.log('Projeto de teste rodando na porta ' + port);
exports = module.exports = app; 