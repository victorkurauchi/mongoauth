var _model = require("../models/User.js");

exports.create = function(req, res) {
  _model.create(req, res);
} 

exports.retrieve = function(req, res) {  
  _model.retrieve(req, res);
}

exports.list = function(req, res) {  
  _model.find(req, res);
}

exports.update = function(req, res) {
  _model.update(req, res);
}

exports.delete = function(req, res) {
  _model.delete(req, res);
}

exports.showUpdate = function(req, res) {
  _model.showUpdate(req, res);
}

exports.login = function(req, res) {
  _model.login(req, res);
}

exports.signup = function(req, res) {
  _model.signup(req, res);
}
