# README - BERTO Tracker

## 📝 Description

**BERTO Tracker** est une application de bureau conçue pour gérer le suivi du temps de travail des employés dans des boutiques, avec des fonctionnalités spécifiques pour l'administration et la gestion des boutiques.

Construite avec **Electron** et utilisant **SQLite** pour la gestion des données, l'application permet aux utilisateurs (administrateurs et managers) de :

- Gérer les employés, les boutiques et les pointages,
- Générer des rapports détaillés,
- Générer des badges PDF avec QR codes pour les employés.

---

## ✨ Fonctionnalités principales

- **Gestion des utilisateurs** : Création, mise à jour, suppression et authentification des administrateurs et managers.
- **Gestion des employés** : Ajout, modification, suppression des employés + génération de badges PDF avec QR codes.
- **Gestion des boutiques** : Création, mise à jour, suppression des boutiques avec localisation géographique.
- **Suivi du temps** : Arrivées/départs, pauses, statuts (présent, absent, retard).
- **Rapports** : Export Excel filtré par date, boutique, département ou employé.
- **Sécurité** : JWT pour l'authentification, Bcrypt pour le hachage des mots de passe.
- **Interface moderne** : Responsive, scanner QR intégré pour le pointage.

---

## ⚙️ Prérequis

- Node.js (v16+)
- npm (inclus avec Node.js)
- Electron (v36.5.0, spécifié dans `package.json`)

---

## 🚀 Installation

1. **Cloner le dépôt** :

```bash
git clone <URL_DU_DÉPÔT>
cd berto_tracker





##Structure du projet

berto_tracker/
├── build/                  # Fichiers de configuration de build Electron
├── build-config.json       # Paramètres de génération
├── config/
│   ├── app.json
│   ├── database.json
│   └── security.json
├── src/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeds/
│   │   └── models/
│   └── frontend/
│       ├── assets/templates/
│       ├── css/
│       ├── js/
│       └── pages/
├── logs/
├── output/
├── .gitignore



##Installer les dépendances
npm install
##Initialiser la base de données
node init-db.js
##Lancer l’application
npm start
##Compiler l’application (pour distribution)
npm run build



| Script                   | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `npm start`              | Lancer l'application Electron                   |
| `npm run build`          | Générer les exécutables pour toutes plateformes |
| `node init-db.js`        | Initialiser la base SQLite                      |
| `node check-db.js`       | Vérifier les connexions à la base               |
| `node check-users.js`    | Afficher les utilisateurs                       |
| `node hash-passwords.js` | Hacher manuellement un mot de passe             |
