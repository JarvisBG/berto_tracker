document.addEventListener('DOMContentLoaded', () => {
  // Vérifie si l'utilisateur est connecté
  const token = localStorage.getItem('token');
  if (!token && window.location.pathname !== '/src/frontend/pages/auth/login.html') {
    window.location.href = '/src/frontend/pages/auth/login.html';
  }
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/src/frontend/pages/auth/login.html';
}