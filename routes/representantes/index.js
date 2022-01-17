const express = require('express');
const router = express.Router();

const RepresentanteService = require('../../services/RepresentanteService');

module.exports = (config) => {

  const representanteService = new RepresentanteService(config.mysql.client);

  router.post('/', async (req, res, next) => {
    try{
      const representante = await representanteService.createRepresentante(req.body.nombre, 
        req.body.inicial, req.body.apellido1, req.body.apellido2, req.body.siglas_partido);
      res.send({representante});
    }catch(err){
      return next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try{
      const representanteList = await representanteService.getAllRepresentantes();
      res.send(representanteList);
    }catch(err){
      return next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try{
      const representante = await representanteService.findOneByPk(req.params.id);
      res.send(representante);
    }catch(err){
      return next(err);
    }
  });

  return router;
};