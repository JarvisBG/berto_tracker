import { login } from '../api/auth.js';
import { showNotification } from '../components/notification.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await login({ username, password });
    if (response.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      showNotification('Connexion réussie !');
      if (user.role === 'admin') {
        window.location.href = '../../pages/admin/dashboard.html';
      } else {
        window.location.href = '../../pages/manager/time-tracking.html';
      }
    } else {
      showNotification(response.message, 'error');
    }
  } catch (error) {
    showNotification('Erreur lors de la connexion', 'error');
  }
});