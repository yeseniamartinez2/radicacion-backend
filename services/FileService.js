const Models = require('../models/sequelize');

class FileService {

  constructor(sequelize) {
    Models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async createFile(filename) {
    try {
      const file = await this.models.File.create({
        filename
      });

      return file
    } catch (err) {
      return err;
    }
  }

  async findOneByPk(id) {
    try {
      const file = await this.models.File.findByPk(id);
      return file
    } catch (err) {
      return err;
    }
  }

  


  async deleteFile(id) {
    try {
      const file = await this.models.File.destroy({ where: { id: id } });
      return "Deleted File";
    } catch (err) {
      return err;
    }
  }



  

}

module.exports = FileService;