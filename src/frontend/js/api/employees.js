const api = window.api;

export async function getEmployees() {
  try {
    return await api.getEmployees();
  } catch (error) {
    console.error('Erreur lors de la récupération des employés:', error);
    throw error;
  }
}

export async function createEmployee(employeeData) {
  try {
    return await api.createEmployee(employeeData);
  } catch (error) {
    console.error('Erreur lors de la création de l’employé:', error);
    throw error;
  }
}

export async function updateEmployee(id, employeeData) {
  try {
    return await api.updateEmployee(id, employeeData);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’employé:', error);
    throw error;
  }
}

export async function deleteEmployee(id) {
  try {
    return await api.deleteEmployee(id);
  } catch (error) {
    console.error('Erreur lors de la suppression de l’employé:', error);
    throw error;
  }
}

export async function generateBadge(employeeId) {
  try {
    return await api.generateBadge(employeeId);
  } catch (error) {
    console.error('Erreur lors de la génération du badge:', error);
    throw error;
  }
}