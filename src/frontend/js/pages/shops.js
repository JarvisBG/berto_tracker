import { getShops, createShop, updateShop, deleteShop } from '../api/shops.js';
import { getEmployees } from '../api/employees.js';

const shopForm = document.getElementById('shopForm');
const shopsTableBody = document.getElementById('shopsTableBody');
const totalShopsElement = document.getElementById('totalShops');
const totalEmployeesElement = document.getElementById('totalEmployees');
const totalZonesElement = document.getElementById('totalZones');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');
const formMessage = document.getElementById('formMessage');
const formError = document.getElementById('formError');
let editingShopId = null;

async function loadShops() {
  try {
    const response = await getShops();
    if (response.success) {
      const shops = response.data;
      shopsTableBody.innerHTML = '';
      shops.forEach(shop => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${shop.id}</td>
          <td>${shop.name}</td>
          <td>${shop.zone}</td>
          <td class="action-buttons">
            <button class="edit-btn" data-id="${shop.id}" data-name="${shop.name}" data-zone="${shop.zone}">✏️ Modifier</button>
            <button class="delete-btn" data-id="${shop.id}">🗑️ Supprimer</button>
          </td>
        `;
        shopsTableBody.appendChild(row);
      });

      // Mettre à jour les statistiques
      totalShopsElement.textContent = shops.length;
      const zones = [...new Set(shops.map(shop => shop.zone))];
      totalZonesElement.textContent = zones.length;

      // Charger le nombre total d'employés
      const employeesResponse = await getEmployees();
      if (employeesResponse.success) {
        totalEmployeesElement.textContent = employeesResponse.data.length;
      } else {
        console.error('Erreur lors du chargement des employés:', employeesResponse.message);
        totalEmployeesElement.textContent = '0';
      }
    } else {
      console.error('Erreur lors du chargement des boutiques:', response.message);
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}

function showMessage(message, isError = false) {
  const element = isError ? formError : formMessage;
  element.textContent = message;
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
  }, 3000);
}

shopForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const shopData = {
    name: document.getElementById('shopName').value,
    zone: document.getElementById('shopZone').value
  };

  try {
    let response;
    if (editingShopId) {
      response = await updateShop(editingShopId, shopData);
      if (response.success) {
        showMessage('Boutique mise à jour avec succès !');
        resetForm();
      } else {
        showMessage(response.message, true);
      }
    } else {
      response = await createShop(shopData);
      if (response.success) {
        showMessage('Boutique ajoutée avec succès !');
        shopForm.reset();
      } else {
        showMessage(response.message, true);
      }
    }
    await loadShops();
  } catch (error) {
    showMessage('Une erreur est survenue.', true);
    console.error('Erreur:', error);
  }
});

shopsTableBody.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-btn')) {
    editingShopId = e.target.dataset.id;
    document.getElementById('shopName').value = e.target.dataset.name;
    document.getElementById('shopZone').value = e.target.dataset.zone;
    submitButton.textContent = 'Mettre à jour';
    cancelButton.style.display = 'inline-block';
  } else if (e.target.classList.contains('delete-btn')) {
    if (confirm('Voulez-vous vraiment supprimer cette boutique ?')) {
      try {
        const response = await deleteShop(e.target.dataset.id);
        if (response.success) {
          showMessage('Boutique supprimée avec succès !');
          await loadShops();
        } else {
          showMessage(response.message, true);
        }
      } catch (error) {
        showMessage('Une erreur est survenue lors de la suppression.', true);
        console.error('Erreur:', error);
      }
    }
  }
});

cancelButton.addEventListener('click', () => {
  resetForm();
});

function resetForm() {
  shopForm.reset();
  submitButton.textContent = 'Ajouter';
  cancelButton.style.display = 'none';
  editingShopId = null;
}

// Charger les boutiques au démarrage
loadShops();