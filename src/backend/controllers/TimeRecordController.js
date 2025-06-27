const TimeRecord = require('../../database/models/TimeRecord');
const ReportService = require('../services/ReportService');
const logger = require('../utils/logger');

class TimeRecordController {
  static async recordTime(recordData) {
    try {
      const record = await TimeRecord.create(recordData);
      return { success: true, data: record };
    } catch (error) {
      logger.error('Erreur lors de l’enregistrement du temps:', error);
      return { success: false, message: error.message };
    }
  }

  static async getReports(filters) {
    try {
      const records = await TimeRecord.getReports(filters);
      const reportPath = await ReportService.generateExcelReport(records, filters);
      return { success: true, data: records, reportPath };
    } catch (error) {
      logger.error('Erreur lors de la génération du rapport:', error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = TimeRecordController;