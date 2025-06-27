const api = window.api;

export async function login(credentials) {
  try {
    const response = await api.login(credentials);
    if (response.success) {
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('user', JSON.stringify(response.user.user));
    }
    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
}