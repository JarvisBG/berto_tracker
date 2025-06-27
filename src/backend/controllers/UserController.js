const User = require('../../database/models/User');
const logger = require('../utils/logger');

class UserController {
  static async getAll() {
    try {
      const users = await User.getAll();
      return { success: true, data: users };
    } catch (error) {
      logger.error('Erreur lors de la récupération des utilisateurs:', error);
      return { success: false, message: error.message };
    }
  }

  static async create(userData) {
    try {
      const user = await User.create(userData);
      return { success: true, data: user };
    } catch (error) {
      logger.error('Erreur lors de la création de l’utilisateur:', error);
      return { success: false, message: error.message };
    }
  }

  static async update(id, userData) {
    try {
      const user = await User.update(id, userData);
      return { success: true, data: user };
    } catch (error) {
      logger.error('Erreur lors de la mise à jour de l’utilisateur:', error);
      return { success: false, message: error.message };
    }
  }

  static async delete(id) {
    try {
      await User.delete(id);
      return { success: true };
    } catch (error) {
      logger.error('Erreur lors de la suppression de l’utilisateur:', error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = UserController;