const db = require('../database');
const logger = require('../../backend/utils/logger');

class Employee {
  static createTable() {
    return new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          shop_id INTEGER NOT NULL,
          department TEXT NOT NULL CHECK(department IN ('Supervision Réseau', 'Commercial', 'Comptabilité', 'SAV', 'Caissière')),
          schedule TEXT NOT NULL,
          hire_date TEXT NOT NULL,
          FOREIGN KEY (shop_id) REFERENCES shops(id)
        )
      `, (err) => {
        if (err) {
          logger.error('Erreur lors de la création de la table employees:', err);
          reject(err);
        } else {
          logger.info('Table employees créée ou déjà existante');
          resolve();
        }
      });
    });
  }

  static create(employeeData) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO employees (name, shop_id, department, schedule, hire_date) VALUES (?, ?, ?, ?, ?)',
        [employeeData.name, employeeData.shop_id, employeeData.department, employeeData.schedule, employeeData.hire_date],
        function (err) {
          if (err) {
            logger.error('Erreur lors de la création de l’employé:', err);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...employeeData });
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM employees', [], (err, rows) => {
        if (err) {
          logger.error('Erreur lors de la récupération des employés:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static update(id, employeeData) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE employees SET name = ?, shop_id = ?, department = ?, schedule = ?, hire_date = ? WHERE id = ?',
        [employeeData.name, employeeData.shop_id, employeeData.department, employeeData.schedule, employeeData.hire_date, id],
        (err) => {
          if (err) {
            logger.error('Erreur lors de la mise à jour de l’employé:', err);
            reject(err);
          } else {
            resolve({ id, ...employeeData });
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM employees WHERE id = ?', [id], (err) => {
        if (err) {
          logger.error('Erreur lors de la suppression de l’employé:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
        if (err) {
          logger.error('Erreur lors de la recherche de l’employé:', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Employee;