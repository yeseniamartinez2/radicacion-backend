const express = require('express');
const router = express.Router();
const multer = require('multer');
const VotoExplicativoService = require('../../services/VotoExplicativoService');

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

  const votoExplicativoService = new VotoExplicativoService(config.mysql.client);
  router.post('/', upload.single('votoExplicativoFile'), async (req, res, next) => {
    try{
      const votoExplicativo = await votoExplicativoService.createVotoExplicativo(req.body.titulo, 
      req.body.estado, req.body.tipo, req.body.filename, req.body.sometidaPor);
      res.send({votoExplicativo});
      console.log(req.file, req.body);
    }catch(err){
      return next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try{
      const votoExplicativoList = await votoExplicativoService.getAllVotoExplicativos();
      res.send(votoExplicativoList);
    }catch(err){
      return next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try{
      const votoExplicativo = await votoExplicativoService.findOneByPk(req.params.id);
      res.send(votoExplicativo);
    }catch(err){
      return next(err);
    }
  });
  router.get('/email/:email', async (req, res, next) => {
    try{
      const votoExplicativos = await votoExplicativoService.findByEmail(req.params.email);
      res.send(votoExplicativos);
    }catch(err){
      return next(err);
    }
  });

  router.get('/autor/:aid/:mid', async (req, res) => {
    try{
      const votoExplicativo = await votoExplicativoService.addAuthor(req.params.aid, req.params.mid);
      res.send(votoExplicativo);
      console.log(votoExplicativo);
    }catch(err){
      return next(err);
    }
  });

  router.get('/delete_authors/:aid/:mid', async (req, res) => {
    try{
      const votoExplicativo = await votoExplicativoService.deleteAuthors(req.params.aid, req.params.mid);
      res.send(votoExplicativo);
      console.log(votoExplicativo);
    }catch(err){
      //return next(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try{
      const votoExplicativo = await votoExplicativoService.deleteVotoExplicativo(req.params.id);
      res.send(votoExplicativo);
    }catch(err){
      return next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try{
      const votoExplicativo = await votoExplicativoService.updateVotoExplicativo(req.params.id, req.body);
      res.send(votoExplicativo);
    }catch(err){
      return next(err);
    }
  });

  return router;
};