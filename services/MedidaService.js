const Models = require('../models/sequelize');

class MedidaService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async findTipoMedida(id){
    try {
      const tipo = await this.models.TipoMedida.findByPk(id);
      return tipo;
    } catch (err) {
      return err;
    }
  }

  async createMedida(titulo, medidaFile, estado, tipo){
    try{
      const rep = await this.models.Medida.create({
        titulo, 
        medidaFile, 
        estado, 
        tipo
      });

      return rep
    }catch(err){
      return err;
    }
  }

  async getAllMedidas(){
    try{
      const allMedidas = await this.models.Medida.findAll({include: [{model: this.models.Representante}]});
      return allMedidas
    }catch(err){
      return err;
    }
  }

  async findOneByPk(id){
    try{
      const medida = await this.models.Medida.findByPk(id, {include: [{model: this.models.Representante}]});
      return medida
    }catch(err){
      return err;
    }
  }

  async addAuthor(autor_id, mid){
    try {
      const medida= await this.models.Medida.findByPk(mid);
      const representante = await this.models.Representante.findByPk(autor_id);
      medida.addRepresentante(representante);
      return 'OK';
    } catch (err) {
      return err;
    }
  }

  async deleteMedida(id){
    try {
      const medida = await this.models.Medida.destroy({where: {id: id}});
      return "Deleted Medida";
    } catch (err) {
      return err;
    }
  }

  async deleteAuthors(aid, mid){
    try {
      const medida = await this.models.Medida.findByPk(mid);
      medida.removeRepresentante(aid);
      return "Deleted Medida";
    } catch (err) {
      return err;
    }
  }

  async updateMedida(id, body){
    try {
      await this.models.Medida.update(body, {where: {id: id}} );
      return body;
    } catch (err) {
      return err;
    }
  }

}

module.exports = MedidaService;