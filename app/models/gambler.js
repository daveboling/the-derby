'use strict';

var _ = require('lodash'),
Mongo = require('mongodb');

function Gambler(o){
  this.name      = o.name || 'Joe Dirt';
  this.photo     = o.photoi || 'http://www.haro-online.com/stuff/joedirt.jpg' ;
  this.assets    = [];
  this.spouse    = {name: o.spouseName, photo: o.spousePhoto};
  this.results   = {wins: 0, losses: 0};
  this.cash      = o.cash;
  this.isDivorced= false;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gambler');}
});

Gambler.prototype.remove = function(name, cb){
  var value = 0;
  _.findIndex(this.assets, function(asset){
    value = asset.value;
  });

  this.cash += value;

  _.remove(this.assets, function(assetName){
    return assetName.name === name;
  });

  if(this.assets.length === 0) { this.isDivorced = true; }

  Gambler.collection.save(this, cb);
};

Gambler.prototype.addAsset = function(asset, cb){
  this.assets.push(asset);

  Gambler.collection.update({_id:this._id}, {$push:{assets: asset}}, cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};


Gambler.findById = function(query, cb){
  var id = Mongo.ObjectID(query);
  Gambler.collection.findOne({_id: id}, function(err, obj){
    var gambler = reProto(obj);
    cb(gambler);
  });
};

Gambler.save = function(gambler, cb){
  Gambler.collection.save(gambler, cb);
};


module.exports = Gambler;


//PRIVATE FUNCTIONS
function reProto(obj){
  return _.create(Gambler.prototype, obj);
}


