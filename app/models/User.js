var mongoose = require('mongoose'), 
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs'),
    SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({

  name     : { type: String, required: true },

  password : { type: String, required: true },

  email    : { type: String, required: true },

  birth    : { type: Date, default: Date.now() },

  phone    : { type: String, default: '5555555'}

});

// userSchema.pre('save', function(next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();



//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err);

//         // override the cleartext password with the hashed one
//         user.password = hash;
//         next();
//     });
//   });
// });

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var Model = mongoose.model('User', userSchema);

// User Methods
exports.find = function(req, res) {

  var query = {};

  Model.find(query, function (err, users) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {

      res.render('section/users', { 
        usuarios: users, 
        msg: 'Usuários retornados do Mongodb @modulus.io: ' +  users.length, 
        title: 'Usuários Teste'
      });
    }
  });
}; 

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

exports.create = function(req, res) {

  var dados = req.body;
  var model = new Model(dados);

  model.save(function(err, data) {
    if(err){
      console.log(err);
      // res.render('section/users', {msg: err})
    } else {
      console.log('sucesso');
      res.redirect('/usuario');
      // res.render('section/users', {
      //   msg: 'Usuário cadastrado com sucesso'
      // });
    }
  });
};

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

exports.login = function(req, res) {

}

exports.signup = function(req, res) {

}