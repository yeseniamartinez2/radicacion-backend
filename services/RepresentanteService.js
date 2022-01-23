const Models = require('../models/sequelize');

class RepresentanteService {

  constructor(sequelize){
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createRepresentante(nombre, inicial, apellido1, apellido2, siglas_partido){
    try{
      const rep = await this.models.Representante.create({
        nombre, 
        inicial, 
        apellido1, 
        apellido2, 
        siglas_partido
      });

      return rep
    }catch(err){
      return err;
    }
  }

  async getAllRepresentantes(){
    try{
      const allRepresentantes = await this.models.Representante.findAll({attributes: {exclude: ['updatedAt', 'createdAt']}
      });
      return allRepresentantes
    }catch(err){
      return err;
    }
  }

  async findOneByPk(id){
    try{
      const representante = await this.models.Representante.findByPk(id);
      return representante
    }catch(err){
      return err;
    }
  }

  async deleteRepresentante(id){
    try {
      const representante = await this.models.Representante.destroy({where: {id: id}});
      return "Deleted Representante";
    } catch (err) {
      return err;
    }
  }
  

}

module.exports = RepresentanteService;