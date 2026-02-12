const chalk = require('chalk');

/**
 * Logger utility for colored console output
 */
class Logger {
  /**
   * Log a success message
   * @param {string} message 
   */
  success(message) {
    console.log(chalk.green('✓'), message);
  }

  /**
   * Log an error message
   * @param {string} message 
   */
  error(message) {
    console.log(chalk.red('✗'), message);
  }

  /**
   * Log an info message
   * @param {string} message 
   */
  info(message) {
    console.log(chalk.blue('ℹ'), message);
  }

  /**
   * Log a warning message
   * @param {string} message 
   */
  warning(message) {
    console.log(chalk.yellow('⚠'), message);
  }

  /**
   * Log a section header
   * @param {string} message 
   */
  header(message) {
    console.log('\n' + chalk.bold(message));
  }

  /**
   * Log a divider line
   */
  divider() {
    console.log(chalk.gray('━'.repeat(50)));
  }

  /**
   * Log plain text
   * @param {string} message 
   */
  log(message) {
    console.log(message);
  }

  /**
   * Display a summary box
   * @param {Object} stats - Statistics object
   */
  summary(stats) {
    this.divider();
    console.log(chalk.bold('Summary:'));
    console.log(`  Total: ${stats.total} files`);
    console.log(chalk.green(`  Success: ${stats.success} files`));
    if (stats.failed > 0) {
      console.log(chalk.red(`  Failed: ${stats.failed} files`));
    }
    if (stats.skipped > 0) {
      console.log(chalk.yellow(`  Skipped: ${stats.skipped} files`));
    }
    this.divider();
  }
}

module.exports = new Logger();
