const fs = require('fs-extra');
const path = require('path');
const libre = require('libreoffice-convert');
const { promisify } = require('util');

// Promisify the libreoffice-convert function
const libreConvertAsync = promisify(libre.convert);

/**
 * Document converter using LibreOffice
 */
class DocumentConverter {
  /**
   * Convert a document file to PDF
   * @param {Object} file - File object with metadata
   * @param {string} outputDir - Output directory path
   * @returns {Promise<Object>} Conversion result with status and message
   */
  async convertToPdf(file, outputDir) {
    try {
      // Read the input file
      const inputBuffer = await fs.readFile(file.fullPath);

      // Convert to PDF using LibreOffice
      const pdfBuffer = await libreConvertAsync(inputBuffer, '.pdf', undefined);

      // Generate output file path
      const outputFileName = `${file.baseName}.pdf`;
      const outputPath = path.join(outputDir, outputFileName);

      // Write the PDF file
      await fs.writeFile(outputPath, pdfBuffer);

      return {
        success: true,
        inputFile: file.name,
        outputFile: outputFileName,
        message: `${file.name} → ${outputFileName}`
      };
    } catch (error) {
      return {
        success: false,
        inputFile: file.name,
        error: error.message,
        message: `${file.name} → Error: ${error.message}`
      };
    }
  }

  /**
   * Check if LibreOffice is available
   * @returns {Promise<Object>} Object with isAvailable boolean and path/error message
   */
  async checkLibreOfficeInstallation() {
    const { exec } = require('child_process');
    const execPromise = promisify(exec);

    try {
      const { stdout } = await execPromise('which libreoffice || where libreoffice');
      const libreOfficePath = stdout.trim();
      
      return {
        isAvailable: true,
        path: libreOfficePath
      };
    } catch (error) {
      return {
        isAvailable: false,
        error: 'LibreOffice not found in system PATH'
      };
    }
  }
}

module.exports = new DocumentConverter();
