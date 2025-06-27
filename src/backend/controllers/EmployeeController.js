const Employee = require('../../database/models/Employee');
const BadgeService = require('../services/BadgeService');
const logger = require('../utils/logger');

class EmployeeController {
  static async getAll() {
    try {
      const employees = await Employee.getAll();
      return { success: true, data: employees };
    } catch (error) {
      logger.error('Erreur lors de la récupération des employés:', error);
      return { success: false, message: error.message };
    }
  }

  static async create(employeeData) {
    try {
      const employee = await Employee.create(employeeData);
      return { success: true, data: employee };
    } catch (error) {
      logger.error('Erreur lors de la création de l’employé:', error);
      return { success: false, message: error.message };
    }
  }

  static async update(id, employeeData) {
    try {
      const employee = await Employee.update(id, employeeData);
      return { success: true, data: employee };
    } catch (error) {
      logger.error('Erreur lors de la mise à jour de l’employé:', error);
      return { success: false, message: error.message };
    }
  }

  static async delete(id) {
    try {
      await Employee.delete(id);
      return { success: true };
    } catch (error) {
      logger.error('Erreur lors de la suppression de l’employé:', error);
      return { success: false, message: error.message };
    }
  }

  static async generateBadge(employeeId) {
    try {
      const employee = await Employee.findById(employeeId);
      if (!employee) throw new Error('Employé non trouvé');
      const badgePath = await BadgeService.generateBadge(employee);
      return { success: true, badgePath };
    } catch (error) {
      logger.error('Erreur lors de la génération du badge:', error);
      return { success: false, message: error.message };
    }
  }
}

module.exports = EmployeeController;