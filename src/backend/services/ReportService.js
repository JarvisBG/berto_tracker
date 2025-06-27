const ExcelJS = require('exceljs');
const path = require('path');
const logger = require('../utils/logger');

class ReportService {
  static async generateExcelReport(records, filters) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Rapport');

    // En-têtes
    worksheet.columns = [
      { header: 'Nom', key: 'name', width: 20 },
      { header: 'Boutique', key: 'shop_name', width: 20 },
      { header: 'Département', key: 'department', width: 20 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Arrivée', key: 'arrival_time', width: 15 },
      { header: 'Départ', key: 'departure_time', width: 15 },
      { header: 'Pauses (min)', key: 'breaks', width: 15 },
      { header: 'Statut', key: 'status', width: 15 }
    ];

    // Données
    records.forEach(record => {
      worksheet.addRow(record);
    });

    // Style
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF6600' }
    };

    const reportPath = path.join(__dirname, '../../../output/reports', `rapport_${Date.now()}.xlsx`);
    await workbook.xlsx.writeFile(reportPath);
    return reportPath;
  }
}

module.exports = ReportService;