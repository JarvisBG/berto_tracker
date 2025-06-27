const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/employee_tracker.db');
db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) {
    console.error('Erreur lors de la vérification:', err);
  } else {
    console.log('Utilisateurs dans la base :', rows);
  }
  db.close();
});