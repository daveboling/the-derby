'use strict';

var Gambler = require('../models/gambler');


exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    console.log(gamblers);
    res.render('gamblers/index', {gamblers: gamblers});
  });
};

exports.removeAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.remove(req.params.name, function(){
      res.send({id: req.params.id, name: req.params.name,isDivored:gambler.isDivorced, cash: gambler.cash});
    });
  });
};


exports.init = function(req, res){
  res.render('gamblers/init');
};

exports.create = function(req,res){
  var gambler = new Gambler(req.body);
  Gambler.save(gambler, function(){
    res.redirect('/gamblers');
  });
};

exports.overview = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    res.render('gamblers/overview', {gambler: gambler});
  });
};

exports.assetInit = function(req, res){
  res.render('gamblers/asset');
};

exports.createAsset = function(req, res){
};

