const Shop = require('../../database/models/Shop');
const logger = require('../utils/logger');

class ShopController {
  static async getAll() {
    try {
      const shops = await Shop.getAll();
      return { success: true, data: shops };
    } catch (error) {
      logger.error('Erreur lors de la récupération des boutiques:', error);
      return { success: false, message: error.message };
    }
  }

  static async create(shopData) {
    try {
      const shop = await Shop.create(shopData);
      return { success: true, data: shop };
    } catch (error) {
      logger.error('Erreur lors de la création de la boutique:', error);
      return { success: false, message: error.message };
    }
  }

  static async update(id, shopData) {
    try {
      const shop = await Shop.update(id, shopData);
      return { success: true, data: shop };
    } catch (error) {
      logger.error('Erreur lors de la mise à jour de la boutique:', error);
      return { success: false, message: error.message };
    }
  }

  static async delete(id) {
    try {
      await Shop.delete(id);
      return { success: true };
    } catch (error) {
      logger.error('Erreur lors de la suppression de la boutique:', error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = ShopController;