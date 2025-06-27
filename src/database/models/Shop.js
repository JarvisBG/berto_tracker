const db = require('../database');
const logger = require('../../backend/utils/logger');

class Shop {
  static createTable() {
    return new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS shops (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          zone TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          logger.error('Erreur lors de la création de la table shops:', err);
          reject(err);
        } else {
          logger.info('Table shops créée ou déjà existante');
          resolve();
        }
      });
    });
  }

  static create(shopData) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO shops (name, zone) VALUES (?, ?)',
        [shopData.name, shopData.zone],
        function (err) {
          if (err) {
            logger.error('Erreur lors de la création de la boutique:', err);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...shopData });
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM shops', [], (err, rows) => {
        if (err) {
          logger.error('Erreur lors de la récupération des boutiques:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static update(id, shopData) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE shops SET name = ?, zone = ? WHERE id = ?',
        [shopData.name, shopData.zone, id],
        (err) => {
          if (err) {
            logger.error('Erreur lors de la mise à jour de la boutique:', err);
            reject(err);
          } else {
            resolve({ id, ...shopData });
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM shops WHERE id = ?', [id], (err) => {
        if (err) {
          logger.error('Erreur lors de la suppression de la boutique:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Shop;