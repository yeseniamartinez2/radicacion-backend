const Models = require('../models');

class UserService {
  async createUser({firstName, lastName, email}){
    try{
      const user = await Models.User.create({
        firstName,
        lastName,
        email
      });

      return user
    }catch(err){
      return err;
    }
  }

  async getAllUsersAttributes(){
    try {
      const users = await Models.User.findAll({
        // attributes: ['firstName', 'lastName', 'email']
        attributes: {exclude: ['pa']}
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async findOneUser(){
    try {
      const user = await Models.User.findOne({where: {firstName: 'wdj'}});
      return user;
    } catch (err) {
      return err;
    }
  }

  async getAllUsers(){
    try {
      const users = await Models.User.findAll({
        include: [
          {
            model: Models.ContactInfo,
            attributes: {exclude: ['updatedAt', 'createdAt', 'UserId']}
          },
          {
            model: Models.Tweet,
            attributes: {exclude: ['updatedAt', 'UserId']}
          }
        ], 
        attributes: {exclude: ['updatedAt', 'createdAt']}
      });
      return users;
    } catch (err) {
      return err;
    }
  }

  async getAllUsersWhere(){
    try {
      const users = await Models.User.findAll({where: {firstName: 'wdj'}});
      return users;
    } catch (err) {
      return err;
    }
  }

  async updateUser(){
    try {
      await Models.User.update({lastName: "lastName changed"},{where: {firstName: 'wdj'}} );
      return "updated User";
    } catch (err) {
      return err;
    }
  }

  async deleteUser(){
    try {
      const user = await Models.User.destroy({where: {firstName: 'wdj'}});
      return "deleted User";
    } catch (err) {
      return err;
    }
  }

  async followUser(){
    try {
      const currentUser = await this.findOneUser();
      const toFollowUser = await Models.User.findOne({where: {firstName: 'tom'}});
      currentUser.addUser(toFollowUser);
      return currentUser.getUser();
    } catch (err) {
      return err;
    }
  }

}

module.exports = UserService;