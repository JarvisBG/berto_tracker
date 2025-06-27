const TimeRecord = require('../../database/models/TimeRecord');
const logger = require('../utils/logger');

class TimeTrackingService {
  static async recordTime(employeeId, type) {
    try {
      const date = new Date().toISOString().split('T')[0];
      const time = new Date().toTimeString().split(' ')[0];

      let record = await TimeRecord.create({
        employee_id: employeeId,
        date,
        [type === 'arrival' ? 'arrival_time' : 'departure_time']: time,
        breaks: 0,
        status: type === 'arrival' ? 'present' : 'present'
      });

      return record;
    } catch (error) {
      logger.error('Erreur lors de l’enregistrement du temps:', error);
      throw error;
    }
  }
}

module.exports = TimeTrackingService;