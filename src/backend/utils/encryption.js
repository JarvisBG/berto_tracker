const bcrypt = require('bcrypt');
const logger = require('./logger');

module.exports = {
  hashPassword: async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      logger.error('Erreur lors du hachage du mot de passe:', error);
      throw error;
    }
  },
  comparePassword: async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      logger.error('Erreur lors de la comparaison du mot de passe:', error);
      throw error;
    }
  }
};