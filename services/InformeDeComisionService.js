const Models = require('../models/sequelize');

class InformeDeComisionService {

  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }




  async createInformeDeComision(titulo, estado, tipo, filename, sometidaPor) {
    try {
      const rep = await this.models.InformeDeComision.create({
        titulo,
        estado,
        tipo,
        sometidaPor
      });

      return rep
    } catch (err) {
      return err;
    }
  }



  async getAllInformeDeComisions() {
    try {
      const allInformeDeComisions = await this.models.InformeDeComision.findAll({ include: [{ model: this.models.Representante }] });
      return allInformeDeComisions
    } catch (err) {
      return err;
    }
  }

  async findOneByPk(id) {
    try {
      const informeDeComision = await this.models.InformeDeComision.findByPk(id, { include: [{ model: this.models.Representante }] });
      return informeDeComision
    } catch (err) {
      return err;
    }
  }

  async findByEmail(email) {
    try {
      const informeDeComisions = await this.models.InformeDeComision.findAll({ where: { sometidaPor: email }, include: [{ model: this.models.Representante }] });
      return informeDeComisions
    } catch (err) {
      return err;
    }
  }

  async addAuthor(autor_id, mid) {
    try {
      const informeDeComision = await this.models.InformeDeComision.findByPk(mid);
      const representante = await this.models.Representante.findByPk(autor_id);
      informeDeComision.addRepresentante(representante);
      return 'OK';
    } catch (err) {
      return err;
    }
  }

  async deleteInformeDeComision(id) {
    try {
      const informeDeComision = await this.models.InformeDeComision.destroy({ where: { id: id } });
      return "Deleted InformeDeComision";
    } catch (err) {
      return err;
    }
  }

  async deleteAuthors(aid, mid) {
    try {
      const informeDeComision = await this.models.InformeDeComision.findByPk(mid);
      informeDeComision.removeRepresentante(aid);
      return "Deleted InformeDeComision";
    } catch (err) {
      return err;
    }
  }

  async updateInformeDeComision(id, body) {
    try {
      await this.models.InformeDeComision.update(body, { where: { id: id } });
      return body;
    } catch (err) {
      return err;
    }
  }

}

module.exports = InformeDeComisionService;