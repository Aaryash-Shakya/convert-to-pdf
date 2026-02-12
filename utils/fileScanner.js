const fs = require('fs-extra');
const path = require('path');

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.doc', '.docx', '.ppt', '.pptx'];

/**
 * Scanner utility for finding supported files in input directory
 */
class FileScanner {
  /**
   * Scan directory for supported document files
   * @param {string} dirPath - Directory path to scan
   * @returns {Promise<Array>} Array of file objects with metadata
   */
  async scanDirectory(dirPath) {
    try {
      // Ensure directory exists
      await fs.ensureDir(dirPath);

      // Read all files in directory
      const files = await fs.readdir(dirPath);

      // Filter for supported files and create file objects
      const supportedFiles = files
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return SUPPORTED_EXTENSIONS.includes(ext);
        })
        .map(file => ({
          name: file,
          fullPath: path.join(dirPath, file),
          extension: path.extname(file).toLowerCase(),
          baseName: path.basename(file, path.extname(file))
        }));

      return supportedFiles;
    } catch (error) {
      throw new Error(`Failed to scan directory: ${error.message}`);
    }
  }

  /**
   * Check if file extension is supported
   * @param {string} filename 
   * @returns {boolean}
   */
  isSupported(filename) {
    const ext = path.extname(filename).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  }

  /**
   * Get list of supported extensions
   * @returns {Array<string>}
   */
  getSupportedExtensions() {
    return [...SUPPORTED_EXTENSIONS];
  }
}

module.exports = new FileScanner();
