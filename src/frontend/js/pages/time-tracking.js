import { getEmployees } from '../api/employees.js';
import { recordTime } from '../api/reports.js';
import { initQRScanner } from '../components/qr-scanner.js';
import { showNotification } from '../components/notification.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadEmployees();

  initQRScanner('qrScanner', 'startScanner', 'stopScanner', async (data) => {
    const employeeId = data.split('-')[1];
    try {
      await recordTime({ employee_id: employeeId, type: 'arrival' });
      showNotification('Pointage enregistré avec succès !');
    } catch (error) {
      showNotification('Erreur lors du pointage', 'error');
    }
  });

  document.getElementById('manualTimeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('employeeSelect').value;
    const type = document.getElementById('timeType').value;

    try {
      await recordTime({ employee_id: employeeId, type });
      showNotification('Pointage enregistré avec succès !');
      e.target.reset();
    } catch (error) {
      showNotification('Erreur lors du pointage', 'error');
    }
  });
});

async function loadEmployees() {
  try {
    const employees = await (await getEmployees()).data;
    const select = document.getElementById('employeeSelect');
    employees.forEach(emp => {
      const option = document.createElement('option');
      option.value = emp.id;
      option.textContent = emp.name;
      select.appendChild(option);
    });
  } catch (error) {
    showNotification('Erreur lors du chargement des employés', 'error');
  }
}