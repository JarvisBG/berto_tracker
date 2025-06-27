const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../database/models/User');
const logger = require('../utils/logger');

class AuthService {
  static async authenticate({ username, password }) {
    const user = await User.findByUsername(username);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Mot de passe incorrect');
    }

    const token = jwt.sign({ id: user.id, role: user.role, shop_id: user.shop_id }, 'secret_key', { expiresIn: '1h' });
    return { user, token };
  }
}

module.exports = AuthService;