const express = require('express');
const router = express.Router();

const MedidaService = require('../../services/MedidaService');

module.exports = (config) => {

  const medidaService = new MedidaService(config.mysql.client);

  router.post('/', async (req, res, next) => {
    try{
      const medida = await medidaService.createMedida(req.body.titulo, 
        req.body.medidaFile, req.body.estado, req.body.tipo);
      res.send({medida});
    }catch(err){
      return next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try{
      const medidaList = await medidaService.getAllMedidas();
      res.send(medidaList);
    }catch(err){
      return next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try{
      const medida = await medidaService.findOneByPk(req.params.id);
      res.send(medida);
    }catch(err){
      return next(err);
    }
  });

  router.post('/autor/:aid/:mid', async (req, res) => {
    try{
      const medida = await medidaService.addAuthor(req.params.aid, req.params.mid);
      res.send(medida);
      console.log(medida);
    }catch(err){
      return next(err);
    }
  });

  return router;
};