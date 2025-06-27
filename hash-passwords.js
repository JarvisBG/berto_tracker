const bcrypt = require('bcrypt');

// Liste des mots de passe à hacher
const passwords = [
  'admin123',        // Pour l'admin
  'manager123',      // Pour manager_pk12
  'manager123'       // Pour manager_zachman
];

// Fonction pour hacher un mot de passe
async function hashPasswords() {
  for (const password of passwords) {
    const hash = await bcrypt.hash(password, 10); // 10 est le nombre de tours (salt rounds)
    console.log(`Mot de passe: ${password} -> Hachage: ${hash}`);
  }
}

// Exécuter la fonction
hashPasswords().catch(err => console.error('Erreur:', err));