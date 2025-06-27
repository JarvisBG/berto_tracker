import { getReports } from '../api/reports.js';
import { initDataTable } from '../components/datatable.js';
import { showNotification } from '../components/notification.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const filters = {
      dateFrom: document.getElementById('dateFrom').value,
      dateTo: document.getElementById('dateTo').value,
      shopId: document.getElementById('shop').value,
      department: document.getElementById('department').value,
      status: document.getElementById('status').value
    };

    try {
      const response = await getReports(filters);
      initDataTable('reportTable', [
        { key: 'name' },
        { key: 'shop_name' },
        { key: 'department' },
        { key: 'date' },
        { key: 'arrival_time' },
        { key: 'departure_time' },
        { key: 'breaks' },
        { key: 'status' }
      ], response.data);

      document.getElementById('downloadExcel').onclick = () => {
        window.open(response.reportPath);
      };
    } catch (error) {
      showNotification('Erreur lors de la génération du rapport', 'error');
    }
  });
});