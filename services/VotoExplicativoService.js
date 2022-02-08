const Models = require('../models/sequelize');

class VotoExplicativoService {

  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }


  async createVotoExplicativo(titulo, estado, tipo, filename, sometidaPor) {
    try {
      const rep = await this.models.VotoExplicativo.create({
        titulo,
        estado,
        tipo,
        filename,
        sometidaPor
      });

      return rep
    } catch (err) {
      return err;
    }
  }



  async getAllVotoExplicativos() {
    try {
      const allVotoExplicativos = await this.models.VotoExplicativo.findAll({ include: [{ model: this.models.Representante }] });
      return allVotoExplicativos
    } catch (err) {
      return err;
    }
  }

  async findOneByPk(id) {
    try {
      const votoExplicativo = await this.models.VotoExplicativo.findByPk(id, { include: [{ model: this.models.Representante }] });
      return votoExplicativo
    } catch (err) {
      return err;
    }
  }

  async findByEmail(email) {
    try {
      const votoExplicativos = await this.models.VotoExplicativo.findAll({ where: { sometidaPor: email }, include: [{ model: this.models.Representante }] });
      return votoExplicativos
    } catch (err) {
      return err;
    }
  }

  async addAuthor(autor_id, mid) {
    try {
      const votoExplicativo = await this.models.VotoExplicativo.findByPk(mid);
      const representante = await this.models.Representante.findByPk(autor_id);
      votoExplicativo.addRepresentante(representante);
      return 'OK';
    } catch (err) {
      return err;
    }
  }

  async deleteVotoExplicativo(id) {
    try {
      const votoExplicativo = await this.models.VotoExplicativo.destroy({ where: { id: id } });
      return "Deleted VotoExplicativo";
    } catch (err) {
      return err;
    }
  }

  async deleteAuthors(aid, mid) {
    try {
      const votoExplicativo = await this.models.VotoExplicativo.findByPk(mid);
      votoExplicativo.removeRepresentante(aid);
      return "Deleted VotoExplicativo";
    } catch (err) {
      return err;
    }
  }

  async updateVotoExplicativo(id, body) {
    try {
      await this.models.VotoExplicativo.update(body, { where: { id: id } });
      return body;
    } catch (err) {
      return err;
    }
  }

}

module.exports = VotoExplicativoService;