const db = require('../database');
const logger = require('../../backend/utils/logger');

class TimeRecord {
  static createTable() {
    return new Promise((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS time_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          employee_id INTEGER NOT NULL,
          date TEXT NOT NULL,
          arrival_time TEXT,
          departure_time TEXT,
          breaks INTEGER,
          status TEXT CHECK(status IN ('present', 'absent', 'late')),
          FOREIGN KEY (employee_id) REFERENCES employees(id)
        )
      `, (err) => {
        if (err) {
          logger.error('Erreur lors de la création de la table time_records:', err);
          reject(err);
        } else {
          logger.info('Table time_records créée ou déjà existante');
          resolve();
        }
      });
    });
  }

  static create(recordData) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO time_records (employee_id, date, arrival_time, departure_time, breaks, status) VALUES (?, ?, ?, ?, ?, ?)',
        [recordData.employee_id, recordData.date, recordData.arrival_time, recordData.departure_time, recordData.breaks, recordData.status],
        function (err) {
          if (err) {
            logger.error('Erreur lors de la création de l’enregistrement:', err);
            reject(err);
          } else {
            resolve({ id: this.lastID, ...recordData });
          }
        }
      );
    });
  }

  static getReports(filters) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT tr.*, e.name, e.department, s.name as shop_name FROM time_records tr JOIN employees e ON tr.employee_id = e.id JOIN shops s ON e.shop_id = s.id WHERE 1=1';
      let params = [];

      if (filters.dateFrom) {
        query += ' AND tr.date >= ?';
        params.push(filters.dateFrom);
      }
      if (filters.dateTo) {
        query += ' AND tr.date <= ?';
        params.push(filters.dateTo);
      }
      if (filters.shopId) {
        query += ' AND e.shop_id = ?';
        params.push(filters.shopId);
      }
      if (filters.department) {
        query += ' AND e.department = ?';
        params.push(filters.department);
      }
      if (filters.employeeId) {
        query += ' AND tr.employee_id = ?';
        params.push(filters.employeeId);
      }
      if (filters.status) {
        query += ' AND tr.status = ?';
        params.push(filters.status);
      }

      db.all(query, params, (err, rows) => {
        if (err) {
          logger.error('Erreur lors de la récupération des rapports:', err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = TimeRecord;