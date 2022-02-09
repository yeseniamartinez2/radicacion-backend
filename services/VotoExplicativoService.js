const Models = require('../models/sequelize');

class VotoExplicativoService {

  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }


  async createVotoExplicativo(titulo, estado, tipo, sometidaPor, filename, MedidaId) {
    try {
      const file = await this.models.File.create({ filename });
      const medida = await this.models.Medida.findByPk(MedidaId);
      console.log(medida);
      const votoExplicativo = await this.models.VotoExplicativo.create({
        titulo,
        estado,
        tipo,
        sometidaPor
      });
      votoExplicativo.addFile(file);
      await medida.addVotoExplicativo(votoExplicativo);
      return votoExplicativo
    } catch (err) {
      return err;
    }
  }



  async getAllVotoExplicativos() {
    try {
      const allVotoExplicativos = await this.models.VotoExplicativo.findAll({ include: [
        { model: this.models.Representante },
        { model: this.models.Medida }
      ] });
      return allVotoExplicativos
    } catch (err) {
      return err;
    }
  }

  async findOneByPk(id) {
    try {
      const votoExplicativo = await this.models.VotoExplicativo.findByPk(id, { include: [
        { model: this.models.Representante },
        { model: this.models.Medida }
      ] });
      return votoExplicativo
    } catch (err) {
      return err;
    }
  }

  async findByEmail(email) {
    try {
      const votoExplicativos = await this.models.VotoExplicativo.findAll({ where: { sometidaPor: email }, include: [
        { model: this.models.Representante },
        { model: this.models.Medida }
      ] });
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