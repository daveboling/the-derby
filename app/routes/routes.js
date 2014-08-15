'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    home           = require('../controllers/home'),
    gambler        = require('../controllers/gambler');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/gamblers', gambler.index);
  app.delete('/gamblers/:id/assets/:name', gambler.removeAsset);

  app.get('/gambler/new', gambler.init);
  app.post('/gambler/new', gambler.create);
  app.get('/gambler/:id', gambler.overview);
  app.get('/gambler/:id/asset/new', gambler.assetInit);
  app.post('/gambler/:id/asset/new', gambler.createAsset);

  console.log('Routes Loaded');
};

