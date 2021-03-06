var mongoose = require('mongoose'), 
    Schema   = mongoose.Schema,
    auth     = require('./Auth.js');

var userSchema = mongoose.Schema({

  name     : { type: String, required: true },
  password : { type: String, required: true },
  email    : { type: String, required: true },
  birth    : { type: Date, default: Date.now() },
  phone    : { type: String, default: '5555555'}

});

var Model = mongoose.model('User', userSchema);

// Listagem de usuarios
exports.find = function(req, res) {

  req.session.errorMsg = '';
  req.session.successMsg = '';

  var query = {};

  Model.find(query, function (err, users) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {

      if (req.session.user == null) {
        res.render('index', {errorMsg: 'Acesso negado, por favor faça seu login' });
      } else {
        res.render('section/users', { 
          usuarios: users, 
          msg: 'Usuários retornados do Mongodb: ' +  users.length, 
          title: 'Usuários Teste'
        });
      }
    }
  });
}; 

// Busca de um determinado usuario
exports.retrieve = function(req, res) {

  var id = req.params.id;
  var query = {_id: id}

  Model.findOne(query, function (err, user) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(user);
    }
  });

}

// Criação de usuario
exports.create = function(req, res) {

  var dados = req.body;

  dados.password = auth.md5(dados.password);

  var regexPattern = new RegExp('^(0|[1-9][0-9]*)$');

  console.log(regexPattern.test(dados.phone));

  if (! dados.phone.match(regexPattern) ) {
    req.session.errorMsg = 'Fone deve conter apenas números';
    res.redirect('/usuario');
  } else {
    var model = new Model(dados);

    model.save(function(err, data) {
      if(err){
        console.log(err);
        res.render('section/users', {msg: err})
      } else {
        console.log('sucesso');
        res.redirect('/usuario');
        // res.render('section/users', {
        //   msg: 'Usuário cadastrado com sucesso'
        // });
      }
    });
  }
  
};

// Modificação de usuario
exports.update = function(req, res) {

  var id    = req.params.id;
  var dados = req.body;
  var query = {_id: id};

  Model.update(query, dados, function(err, user) {
    if(err) {
      console.log('erro', err);
    } else {
      console.log('sucesso');
      req.success = 'Usuário atualizado com sucesso';
      res.redirect('/usuario');
    }
  });

}

// Remoção de usuario
exports.delete = function(req, res) {

  var id = req.params.id;
  var query = {_id: id};

  Model.remove({_id: id}, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      req.success = 'Usuário removido com sucesso';
      res.redirect('/usuario');
    }
  });
}

// Exibir pagina de update
exports.showUpdate = function(req, res){
  var id = req.params.id;

  var query = {_id: id};

  Model.findOne(query, function (err, user) {
    if(err) {
      console.log(err);
      return err;
    } else {
      res.render('section/update', {usuario: user});
    }
  });
};

// Login de usuario
exports.login = function(req, res) {

  var user = req.param('email'),
      pass = auth.md5(req.param('password'));

  if (typeof user != 'undefined' && typeof pass != 'undefined') {

    var query = Model.findOne().where('email').equals(user).where('password').equals(pass);

    query.exec(function (err, user) {

      if (err) {
        res.render('section/login', {msg: 'Erro inesperado, tente novamente'});
      } else {

        if (!user) {
          res.render('section/login', {msg: 'Ooooops, usuário/senha incorretos'});
        } else {
          req.session.user = user;
          res.redirect('/account');
        }
      }
    });
  }

}

exports.signup = function(req, res) {

}