// modules
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var path     = require('path');
var user     = require('./app/routes/users');

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
app.use(app.router);

// API
app.get('/api/user', user.list);
app.post('/api/user', user.create);
app.get('/api/user/:id', user.retrieve);
app.put('/api/user/:id', user.update);
app.delete('/api/user/:id', user.delete);

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/usuario', user.list);

// signup
app.post('/signup', user.signup);

//login
app.get('/login', function(req, res) {
  res.render('section/login');
});

app.post('/login', user.login);

// start app
app.listen(port);	
console.log('Projeto de teste rodando na porta ' + port);
exports = module.exports = app; 