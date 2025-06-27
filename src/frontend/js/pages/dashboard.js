import { getEmployees, getShops } from '../api/employees.js';
import { getReports } from '../api/reports.js';
import { initDataTable } from '../components/datatable.js';
import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Charger les statistiques
    const employees = await (await getEmployees()).data;
    const shops = await (await getShops()).data;
    const reports = await (await getReports({ dateFrom: new Date().toISOString().split('T')[0] })).data;

    document.getElementById('totalEmployees').textContent = employees.length;
    document.getElementById('totalShops').textContent = shops.length;
    document.getElementById('presentToday').textContent = reports.filter(r => r.status === 'present').length;
    document.getElementById('lateToday').textContent = reports.filter(r => r.status === 'late').length;

    // Tableau des employés
    initDataTable('employeeTable', [
      { key: 'name' },
      { key: 'shop_name' },
      { key: 'department' },
      { key: 'arrival_time' },
      { key: 'status' },
      { key: 'hours' }
    ], reports);

    // Graphique par boutique
    const storeChart = new Chart(document.getElementById('storeChart'), {
      type: 'bar',
      data: {
        labels: shops.map(s => s.name),
        datasets: [{
          label: 'Présence',
          data: shops.map(s => reports.filter(r => r.shop_id === s.id && r.status === 'present').length),
          backgroundColor: '#FF6600'
        }]
      }
    });

    // Graphique des heures
    const hoursChart = new Chart(document.getElementById('hoursChart'), {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Heures travaillées',
          data: [8, 7.5, 8, 8.5, 7, 6, 0],
          borderColor: '#FF6600',
          fill: false
        }]
      }
    });
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error);
  }
});