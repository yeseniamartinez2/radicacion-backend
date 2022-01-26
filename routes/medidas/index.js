const express = require('express');
const router = express.Router();
const multer = require('multer');
const MedidaService = require('../../services/MedidaService');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
      console.log(file);
      cb(null , file.originalname );
  }
});

const upload = multer({ storage: storage });

module.exports = (config) => {

  const medidaService = new MedidaService(config.mysql.client);
  router.post('/', upload.single('medidaFile'), async (req, res, next) => {
    try{
      const medida = await medidaService.createMedida(req.body.titulo, 
      req.body.estado, req.body.tipo, req.body.filename);
      res.send({medida});
      console.log(req.file, req.body);
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

  router.get('/autor/:aid/:mid', async (req, res) => {
    try{
      const medida = await medidaService.addAuthor(req.params.aid, req.params.mid);
      res.send(medida);
      console.log(medida);
    }catch(err){
      return next(err);
    }
  });

  router.get('/delete_authors/:aid/:mid', async (req, res) => {
    try{
      const medida = await medidaService.deleteAuthors(req.params.aid, req.params.mid);
      res.send(medida);
      console.log(medida);
    }catch(err){
      //return next(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try{
      const medida = await medidaService.deleteMedida(req.params.id);
      res.send(medida);
    }catch(err){
      return next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try{
      const medida = await medidaService.updateMedida(req.params.id, req.body);
      res.send(medida);
    }catch(err){
      return next(err);
    }
  });

  return router;
};