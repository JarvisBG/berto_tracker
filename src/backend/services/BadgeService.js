const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const logger = require('../utils/logger');

class BadgeService {
  static async generateBadge(employee) {
    return new Promise((resolve, reject) => {
      const badgePath = path.join(__dirname, '../../../output/badges', `badge_${employee.id}.pdf`);
      const doc = new PDFDocument({ size: [350, 500] });
      const stream = fs.createWriteStream(badgePath);

      doc.pipe(stream);

      // Header
      doc.rect(0, 0, 350, 100).fill('#FF6600');
      doc.font('Helvetica-Bold').fontSize(28).fillColor('white').text('SD BERTO', 20, 30, { align: 'center' });
      doc.font('Helvetica').fontSize(14).text('Badge Employé', 20, 60, { align: 'center' });

      // Employee Info
      doc.font('Helvetica-Bold').fontSize(24).fillColor('#333').text(employee.name, 20, 150, { align: 'center' });
      doc.font('Helvetica').fontSize(16).text(`Poste: ${employee.department}`, 20, 200, { align: 'center' });
      doc.fontSize(16).text(`Boutique: ${employee.shop_id === 1 ? 'Boutique PK 12' : 'Boutique Zachman'}`, 20, 230, { align: 'center' });

      // QR Code
      const qrPath = path.join(__dirname, '../../../output/temp', `qr_${employee.id}.png`);
      QRCode.toFile(qrPath, `EMP-${employee.id}`, { width: 120 }, (err) => {
        if (err) {
          logger.error('Erreur lors de la génération du QR code:', err);
          reject(err);
          return;
        }

        doc.image(qrPath, 115, 300, { width: 120 });
        doc.font('Helvetica').fontSize(11).fillColor('#888').text(`ID: EMP-${employee.id} | Validé le ${new Date().toLocaleDateString('fr-FR')}`, 20, 470, { align: 'center' });

        doc.end();

        stream.on('finish', () => {
          fs.unlinkSync(qrPath); // Supprime le fichier QR temporaire
          resolve(badgePath);
        });

        stream.on('error', (err) => {
          logger.error('Erreur lors de l’écriture du badge PDF:', err);
          reject(err);
        });
      });
    });
  }
}

module.exports = BadgeService;