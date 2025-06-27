const QRCode = require('qrcode');
const path = require('path');
const logger = require('../utils/logger');

class QRCodeService {
  static async generateQRCode(data) {
    try {
      const qrPath = path.join(__dirname, '../../../output/temp', `qr_${Date.now()}.png`);
      await QRCode.toFile(qrPath, data, { width: 120 });
      return qrPath;
    } catch (error) {
      logger.error('Erreur lors de la génération du QR code:', error);
      throw error;
    }
  }
}

module.exports = QRCodeService;