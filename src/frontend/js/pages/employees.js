import { getEmployees, createEmployee, updateEmployee, deleteEmployee, generateBadge } from '../api/employees.js';
import { getShops } from '../api/shops.js';

const employeeForm = document.getElementById('employeeForm');
const employeesTableBody = document.getElementById('employeesTableBody');
const totalEmployeesElement = document.getElementById('totalEmployees');
const totalShopsElement = document.getElementById('totalShops');
const totalDepartmentsElement = document.getElementById('totalDepartments');
const newEmployeesElement = document.getElementById('newEmployees');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');
const formMessage = document.getElementById('formMessage');
const formError = document.getElementById('formError');
const searchName = document.getElementById('searchName');
const filterShop = document.getElementById('filterShop');
const filterDepartment = document.getElementById('filterDepartment');
const employeeShopSelect = document.getElementById('employeeShop');
let editingEmployeeId = null;
let shops = [];

async function loadShops() {
  try {
    const response = await getShops();
    if (response.success) {
      shops = response.data;
      // Remplir les options des boutiques pour le formulaire et le filtre
      filterShop.innerHTML = '<option value="">Toutes les boutiques</option>';
      employeeShopSelect.innerHTML = '';
      shops.forEach(shop => {
        const option = document.createElement('option');
        option.value = shop.id;
        option.textContent = shop.name;
        filterShop.appendChild(option.cloneNode(true));
        employeeShopSelect.appendChild(option);
      });
      totalShopsElement.textContent = shops.length;
    } else {
      console.error('Erreur lors du chargement des boutiques:', response.message);
      totalShopsElement.textContent = '0';
    }
  } catch (error) {
    console.error('Erreur:', error);
    totalShopsElement.textContent = '0';
  }
}

async function loadEmployees() {
  try {
    const response = await getEmployees();
    if (response.success) {
      let employees = response.data;

      // Appliquer les filtres
      const nameFilter = searchName.value.toLowerCase();
      const shopFilter = filterShop.value;
      const departmentFilter = filterDepartment.value;

      if (nameFilter) {
        employees = employees.filter(employee => employee.name.toLowerCase().includes(nameFilter));
      }
      if (shopFilter) {
        employees = employees.filter(employee => employee.shop_id == shopFilter);
      }
      if (departmentFilter) {
        employees = employees.filter(employee => employee.department === departmentFilter);
      }

      employeesTableBody.innerHTML = '';
      employees.forEach(employee => {
        const shop = shops.find(s => s.id === employee.shop_id);
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${shop ? shop.name : 'Inconnu'}</td>
          <td><span class="badge badge-department">${employee.department}</span></td>
          <td><span class="badge badge-schedule">${employee.schedule}</span></td>
          <td>${employee.hire_date}</td>
          <td class="action-buttons">
            <button class="edit-btn" data-id="${employee.id}" data-name="${employee.name}" data-shop-id="${employee.shop_id}" 
                    data-department="${employee.department}" data-schedule="${employee.schedule}" 
                    data-hire-date="${employee.hire_date}">✏️</button>
            <button class="btn-danger" data-id="${employee.id}">🗑️</button>
            <button class="btn-success" data-id="${employee.id}" onclick="generateBadge(${employee.id})">🎫</button>
          </td>
        `;
        employeesTableBody.appendChild(row);
      });

      // Mettre à jour les statistiques
      totalEmployeesElement.textContent = employees.length;

      // Calculer les départements uniques
      const departments = [...new Set(employees.map(employee => employee.department))];
      totalDepartmentsElement.textContent = departments.length;

      // Calculer les nouveaux employés ce mois-ci
      const currentMonth = new Date().toISOString().slice(0, 7); // Format YYYY-MM
      const newEmployees = employees.filter(employee => employee.hire_date.startsWith(currentMonth));
      newEmployeesElement.textContent = newEmployees.length;
    } else {
      console.error('Erreur lors du chargement des employés:', response.message);
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

employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const employeeData = {
    name: document.getElementById('employeeName').value,
    shop_id: document.getElementById('employeeShop').value,
    department: document.getElementById('employeeDepartment').value,
    schedule: document.getElementById('employeeSchedule').value,
    hire_date: document.getElementById('employeeHireDate').value
  };

  try {
    let response;
    if (editingEmployeeId) {
      response = await updateEmployee(editingEmployeeId, employeeData);
      if (response.success) {
        showMessage('Employé mis à jour avec succès !');
        resetForm();
      } else {
        showMessage(response.message, true);
      }
    } else {
      response = await createEmployee(employeeData);
      if (response.success) {
        showMessage('Employé ajouté avec succès !');
        employeeForm.reset();
      } else {
        showMessage(response.message, true);
      }
    }
    await loadEmployees();
  } catch (error) {
    showMessage('Une erreur est survenue.', true);
    console.error('Erreur:', error);
  }
});

employeesTableBody.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-btn')) {
    editingEmployeeId = e.target.dataset.id;
    document.getElementById('employeeName').value = e.target.dataset.name;
    document.getElementById('employeeShop').value = e.target.dataset.shopId;
    document.getElementById('employeeDepartment').value = e.target.dataset.department;
    document.getElementById('employeeSchedule').value = e.target.dataset.schedule;
    document.getElementById('employeeHireDate').value = e.target.dataset.hireDate;
    submitButton.textContent = 'Mettre à jour';
    cancelButton.style.display = 'inline-block';
  } else if (e.target.classList.contains('btn-danger')) {
    if (confirm('Voulez-vous vraiment supprimer cet employé ?')) {
      try {
        const response = await deleteEmployee(e.target.dataset.id);
        if (response.success) {
          showMessage('Employé supprimé avec succès !');
          await loadEmployees();
        } else {
          showMessage(response.message, true);
        }
      } catch (error) {
        showMessage('Une erreur est survenue lors de la suppression.', true);
        console.error('Erreur:', error);
      }
    }
  } else if (e.target.classList.contains('btn-success')) {
    try {
      const response = await generateBadge(e.target.dataset.id);
      if (response.success) {
        showMessage('Badge généré avec succès !');
      } else {
        showMessage(response.message, true);
      }
    } catch (error) {
      showMessage('Une erreur est survenue lors de la génération du badge.', true);
      console.error('Erreur:', error);
    }
  }
});

cancelButton.addEventListener('click', () => {
  resetForm();
});

function resetForm() {
  employeeForm.reset();
  submitButton.textContent = 'Ajouter';
  cancelButton.style.display = 'none';
  editingEmployeeId = null;
}

// Gestion des filtres
searchName.addEventListener('input', loadEmployees);
filterShop.addEventListener('change', loadEmployees);
filterDepartment.addEventListener('change', loadEmployees);

// Charger les boutiques et employés au démarrage
loadShops();
loadEmployees();