/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'derby';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var gambler = new Gambler({name: 'Bob', cash: 7777, spouseName: 'Nancy', spousePhoto: 'nancy.jpg'});
      expect(gambler).to.be.instanceof(Gambler);
      expect(gambler.name).to.equal('Bob');
      expect(gambler.cash).to.equal(7777);
      expect(gambler.spouse.name).to.equal('Nancy');
      expect(gambler.spouse.photo).to.equal('nancy.jpg');
      expect(gambler.results.wins).to.equal(0);
      expect(gambler.results.losses).to.equal(0);
    });
  });
  describe('.all', function(){
    it('should get all people', function(done){
      Gambler.all(function(err, people){
        expect(people).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a gambler by ID', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('#remove', function(){
    it('should remove an assest from a gambler', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.remove('House', function(){
          expect(gambler.assets.length).to.equal(0);
          expect(gambler.isDivorced).to.equal(true);
          expect(gambler.cash).to.equal(110000);
          done();
        });
      });
    });
  });

  describe('.save', function(){
    it('should save a new gambler to the database', function(done){
      var gambler = new Gambler({name: 'Bob', cash: 7777, spouseName: 'Nancy', spousePhoto: 'nancy.jpg'});
      Gambler.save(gambler, function(){
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('#addAsset', function(){
    it('should add an asset to a given gambler', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.addAsset({name: 'Boat', photo: 'http://cdn.ubergizmo.com/photos/2009/1/guitar-boat.jpg', value:'50000'}, function(){
          expect(gambler.assets.length).to.equal(2);
          done();
        });
      });
    });
  });





});

