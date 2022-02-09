const express = require('express');
const router = express.Router();

const representantesRoute = require('./representantes');
const medidasRoute = require('./medidas');
const votosExplicativosRoute = require('./votosExplicativos');
const informesDeComisionRoute = require('./informesDeComision');


module.exports = (config) => {

  router.get('/', (req, res) => {
    res.send('Home Page');
  });

  router.use('/representantes', representantesRoute(config));
  router.use('/medidas', medidasRoute(config));
  router.use('/votos-explicativos', votosExplicativosRoute(config));
  router.use('/informes-de-comision', informesDeComisionRoute(config));

  return router;
};