const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/employee_tracker.db');
db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) {
    console.error('Erreur:', err);
  } else {
    console.log('Utilisateurs:', rows);
  }
  db.close();
});