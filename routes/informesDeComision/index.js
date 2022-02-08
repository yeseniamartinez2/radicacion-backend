const express = require('express');
const router = express.Router();
const multer = require('multer');
const InformeDeComisionService = require('../../services/InformeDeComisionService');

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

  const informeDeComisionService = new InformeDeComisionService(config.mysql.client);
  router.post('/',  upload.fields([
    {
        name: 'informeFile', maxCount: 1
    }, {
        name: 'entirilladoFile', maxCount: 1
    }, {
        name: 'entirilladoFile', maxCount: 1
    }
    ]), async (req, res, next) => {
    try{
      const informeDeComision = await informeDeComisionService.createInformeDeComision(req.body.titulo, 
      req.body.estado, req.body.tipo, req.body.filename, req.body.sometidaPor);
      res.send({informeDeComision});
      console.log(req.file, req.body);
    }catch(err){
      return next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try{
      const informeDeComisionList = await informeDeComisionService.getAllInformeDeComisions();
      res.send(informeDeComisionList);
    }catch(err){
      return next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try{
      const informeDeComision = await informeDeComisionService.findOneByPk(req.params.id);
      res.send(informeDeComision);
    }catch(err){
      return next(err);
    }
  });
  router.get('/email/:email', async (req, res, next) => {
    try{
      const informeDeComisions = await informeDeComisionService.findByEmail(req.params.email);
      res.send(informeDeComisions);
    }catch(err){
      return next(err);
    }
  });

  router.get('/autor/:aid/:mid', async (req, res) => {
    try{
      const informeDeComision = await informeDeComisionService.addAuthor(req.params.aid, req.params.mid);
      res.send(informeDeComision);
      console.log(informeDeComision);
    }catch(err){
      return next(err);
    }
  });

  router.get('/delete_authors/:aid/:mid', async (req, res) => {
    try{
      const informeDeComision = await informeDeComisionService.deleteAuthors(req.params.aid, req.params.mid);
      res.send(informeDeComision);
      console.log(informeDeComision);
    }catch(err){
      //return next(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try{
      const informeDeComision = await informeDeComisionService.deleteInformeDeComision(req.params.id);
      res.send(informeDeComision);
    }catch(err){
      return next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try{
      const informeDeComision = await informeDeComisionService.updateInformeDeComision(req.params.id, req.body);
      res.send(informeDeComision);
    }catch(err){
      return next(err);
    }
  });

  return router;
};