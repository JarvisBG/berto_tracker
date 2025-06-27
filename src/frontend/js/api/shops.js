const api = window.api;

export async function getShops() {
  try {
    return await api.getShops();
  } catch (error) {
    console.error('Erreur lors de la récupération des boutiques:', error);
    throw error;
  }
}

export async function createShop(shopData) {
  try {
    return await api.createShop(shopData);
  } catch (error) {
    console.error('Erreur lors de la création de la boutique:', error);
    throw error;
  }
}

export async function updateShop(id, shopData) {
  try {
    return await api.updateShop(id, shopData);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la boutique:', error);
    throw error;
  }
}

export async function deleteShop(id) {
  try {
    return await api.deleteShop(id);
  } catch (error) {
    console.error('Erreur lors de la suppression de la boutique:', error);
    throw error;
  }
}