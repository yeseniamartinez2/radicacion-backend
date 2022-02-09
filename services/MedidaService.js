const Models = require('../models/sequelize');

class MedidaService {

  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }


  async createMedida(titulo, estado, tipo, sometidaPor, filename) {
    try {
      const file = await this.models.File.create({filename});
      const medida = await this.models.Medida.create({
        titulo,
        estado,
        tipo,
        sometidaPor
      });
      medida.addFile(file);
      
      return medida
    } catch (err) {
      return err;
    }
  }

  async getAllMedidasRadicadas() {
    try {
      const allMedidas = await this.models.Medida.findAll({
        attributes: ['id', 'titulo', 'tipo', 'numeroAsignado'],
        where: {
          estado: 'radicada'
        }
      });
      return allMedidas
    } catch (err) {
      return err;
    }
  }



  async getAllMedidas() {
    try {
      const allMedidas = await this.models.Medida.findAll({
        include: [
          {
            model: this.models.File,
            attributes: {exclude: ['updatedAt', 'createdAt', 'MedidaId', 'InformeDeComisionId', 'VotoExplicativoId']}
          },
          {
            model: this.models.Representante,
            attributes: {exclude: ['updatedAt', 'UserId']}
          }
        ]
      });
      return allMedidas
    } catch (err) {
      return err;
    }
  }

  async findOneByPk(id) {
    try {
      const medida = await this.models.Medida.findByPk(id, { include: [
          {model: this.models.Representante},
          {model: this.models.File}
        ] }
      );
      return medida
    } catch (err) {
      return err;
    }
  }

  async findByEmail(email) {
    try {
      const medidas = await this.models.Medida.findAll({ where: { sometidaPor: email }, include: [{ model: this.models.Representante }] });
      return medidas
    } catch (err) {
      return err;
    }
  }

  async addAuthor(autor_id, mid) {
    try {
      const medida = await this.models.Medida.findByPk(mid);
      const representante = await this.models.Representante.findByPk(autor_id);
      medida.addRepresentante(representante);
      return 'OK';
    } catch (err) {
      return err;
    }
  }

  async deleteMedida(id) {
    try {
      const medida = await this.models.Medida.destroy({ where: { id: id } });
      return "Deleted Medida";
    } catch (err) {
      return err;
    }
  }

  async deleteAuthors(aid, mid) {
    try {
      const medida = await this.models.Medida.findByPk(mid);
      medida.removeRepresentante(aid);
      return "Deleted Medida";
    } catch (err) {
      return err;
    }
  }

  async updateMedida(id, body) {
    try {
      await this.models.Medida.update(body, { where: { id: id } });
      return body;
    } catch (err) {
      return err;
    }
  }

}

module.exports = MedidaService;