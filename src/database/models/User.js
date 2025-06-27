const db = require('../database');
const logger = require('../../backend/utils/logger');

class User {
  static createTable() {
    return new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('admin', 'manager')),
          shop_id INTEGER,
          FOREIGN KEY (shop_id) REFERENCES shops(id)
        )
      `, (err) => {
        if (err) {
          logger.error('Erreur lors de la création de la table users:', err);
          reject(err);
        } else {
          logger.info('Table users créée ou déjà existante');
          resolve();
        }
      });
    });
  }

  static create(userData) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (name, username, password, role, shop_id) VALUES (?, ?, ?, ?, ?)',
        [userData.name, userData.username, userData.password, userData.role, userData.shop_id],
        function (err) {
          if (err) {
            logger.error('Erreur lors de la création de l’utilisateur:', err);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...userData });
          }
        }
      );
    });
  }

  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          logger.error('Erreur lors de la recherche de l’utilisateur:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          logger.error('Erreur lors de la récupération des utilisateurs:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static update(id, userData) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET name = ?, username = ?, password = ?, role = ?, shop_id = ? WHERE id = ?',
        [userData.name, userData.username, userData.password, userData.role, userData.shop_id, id],
        (err) => {
          if (err) {
            logger.error('Erreur lors de la mise à jour de l’utilisateur:', err);
            reject(err);
          } else {
            resolve({ id, ...userData });
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
          logger.error('Erreur lors de la suppression de l’utilisateur:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = User;