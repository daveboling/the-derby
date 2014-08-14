'use strict';

function Gambler(){

}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gambler');}
});

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

module.exports = Gambler;

