const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    logger.warn('Tentative d’accès sans token');
    return res.status(401).json({ message: 'Token requis' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Erreur d’authentification:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
};