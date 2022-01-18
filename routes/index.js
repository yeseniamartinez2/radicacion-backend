const express = require('express');
const router = express.Router();

const tweetsRoute = require('./tweets');
const representantesRoute = require('./representantes');
const medidasRoute = require('./medidas');


module.exports = (config) => {

  router.get('/', (req, res) => {
    res.send('Home Page');
  });

  router.use('/tweet', tweetsRoute(config));
  router.use('/representantes', representantesRoute(config));
  router.use('/medidas', medidasRoute(config));

  return router;
};