const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// 📍 Corriger ici : on part du chemin du fichier courant (__dirname), qui est à la racine du projet
const projectRoot = __dirname;

// 📁 Répertoire data dans le dossier du projet
const dataDir = path.join(projectRoot, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 📂 Base dans le bon dossier
const dbPath = path.join(dataDir, 'employee_tracker.db');
console.log('📂 Base de données utilisée :', dbPath);

// Connexion
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur de connexion à la base de données :', err);
    process.exit(1);
  }
  console.log('✅ Connexion à la base de données établie.');
});

// 📄 Migrations
const migrationDir = path.join(projectRoot, 'src', 'database', 'migrations');
const migrations = [
  '001_create_users.sql',
  '002_create_shops.sql',
  '003_create_employees.sql',
  '004_create_time_records.sql'
];

migrations.forEach((migration) => {
  const sqlPath = path.join(migrationDir, migration);
  const sql = fs.readFileSync(sqlPath, 'utf8');
  db.exec(sql, (err) => {
    if (err) {
      console.error(`❌ Erreur lors de ${migration} :`, err);
      process.exit(1);
    }
    console.log(`✅ Migration ${migration} exécutée.`);
  });
});

// 📥 Données initiales
const seedPath = path.join(projectRoot, 'src', 'database', 'seeds', 'initial_data.sql');
const seedSQL = fs.readFileSync(seedPath, 'utf8');

db.exec(seedSQL, (err) => {
  if (err) {
    console.error('❌ Erreur lors de l\'insertion des données initiales :', err);
    process.exit(1);
  }
  console.log('✅ Données initiales insérées.');
});

db.close((err) => {
  if (err) {
    console.error('❌ Erreur fermeture DB :', err);
    process.exit(1);
  }
  console.log('✅ Base de données prête et fermée.');
});
