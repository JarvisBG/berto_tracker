const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const logger = require('../backend/utils/logger');

// 📌 Chemin racine du projet
const projectRoot = path.resolve(__dirname, '../../..');

// 📁 Dossier data à la racine du projet
const dataDir = path.join(__dirname, '..', '..', '..', 'berto_tracker', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 📌 Chemin absolu vers la base
const dbPath = path.join(dataDir, 'employee_tracker.db');
console.log('📂 Base SQLite utilisée :', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    logger.error('Erreur de connexion à la base de données:', err);
  } else {
    logger.info('Connexion à la base de données SQLite établie');
  }
});

module.exports = db;
