const logger = require('../utils/logger');

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    logger.warn('Erreur de validation:', error.details);
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};