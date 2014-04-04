var mongoose = require('mongoose'), 
    Schema   = mongoose.Schema;

/* connection test */
var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var petSchema = mongoose.Schema({

  race      : { 
    type    : String, 
    default : '' 
  },

  size      : { 
    type    : Number, 
    default : 0 
  },

  weight    : { 
    type    : Number, 
    default : 0 
  },

  price     : { 
    type    : Number, 
    default : 0 
  },

  details   : { 
    type    : String, 
    default : '' 
  }

});

var Model = mongoose.model('Pet', petSchema);

exports.find = function(req, res) {

  var query = {};

  Model.find(query, function (err, pets) {
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(pets);
    }
  });
}; 

exports.retrieve = function(req, res) {

  var id = req.params.id;
  var query = {_id: id}

  Model.findOne(query, function (err, pet) {
    console.log('achou algo?');
    if(err) {
      console.log('Houve algum erro, tente novamente', err);
    } else {
      res.json(pet);
    }
  });

}

exports.create = function(req, res) {

  var dados = req.body;
  var model = new Model(dados);

  model.save(function(err, data) {
    if(err){
      console.log(err);
      res.render("list", {msg: err})
    } else {
      res.json(data);
    }
  });
};

exports.update = function(req, res) {

  var id = req.params.id;
  var dados = req.body;
  var query = {_id: id};

  console.log('id', id);
  console.log('query', query);

  Model.update(query, dados, function(err, pet) {
    if(err) {
      console.log('erro', err);
    } else {
      console.log('sucesso', pet);
      res.json(pet);
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
      res.json(data);
    }
  });
}