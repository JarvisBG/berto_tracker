import { getUsers, createUser, updateUser, deleteUser } from '../api/users.js';
import { initDataTable } from '../components/datatable.js';
import { showNotification } from '../components/notification.js';
import { hashPassword } from '../utils/encryption.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadUsers();

  document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {
      name: document.getElementById('nom').value,
      username: document.getElementById('identifiant').value,
      password: await hashPassword(document.getElementById('motdepasse').value),
      role: document.getElementById('role').value,
      shop_id: document.getElementById('boutique').value
    };

    try {
      await createUser(userData);
      showNotification('Utilisateur ajouté avec succès !');
      await loadUsers();
      e.target.reset();
    } catch (error) {
      showNotification('Erreur lors de l’ajout de l’utilisateur', 'error');
    }
  });
});

async function loadUsers() {
  try {
    const users = await (await getUsers()).data;
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalAdmins').textContent = users.filter(u => u.role === 'admin').length;
    document.getElementById('totalManagers').textContent = users.filter(u => u.role === 'manager').length;
    initDataTable('usersTable', [
      { key: 'name' },
      { key: 'shop_id' },
      { key: 'username' },
      { key: 'password' },
      { key: 'role' }
    ], users, {
      edit: (user) => editUser(user),
      delete: (id) => deleteUser(id)
    });
  } catch (error) {
    showNotification('Erreur lors du chargement des utilisateurs', 'error');
  }
}

function editUser(user) {
  // Implémenter la logique pour modifier un utilisateur
}