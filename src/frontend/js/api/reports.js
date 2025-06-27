const api = window.api;

export async function getReports(filters) {
  try {
    return await api.getReports(filters);
  } catch (error) {
    console.error('Erreur lors de la récupération des rapports:', error);
    throw error;
  }
}