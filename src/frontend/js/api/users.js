const api = window.api;

export async function getUsers() {
  try {
    return await api.getUsers();
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    return await api.createUser(userData);
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur:', error);
    throw error;
  }
}

export async function updateUser(id, userData) {
  try {
    return await api.updateUser(id, userData);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    return await api.deleteUser(id);
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur:', error);
    throw error;
  }
}