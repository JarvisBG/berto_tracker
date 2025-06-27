const AuthService = require('../services/AuthService');
const logger = require('../utils/logger');

class AuthController {
  static async login(credentials) {
    try {
      const user = await AuthService.authenticate(credentials);
      return { success: true, user };
    } catch (error) {
      logger.error('Erreur d’authentification:', error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = AuthController;