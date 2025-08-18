const fs = require('fs');
const path = require('path');

// Configuration
const LOG_FILE = 'pre-dev-check.log';
const REQUIRED_FILES = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'src/main.tsx',
  'src/App.tsx',
  'index.html'
];

const REQUIRED_DEPENDENCIES = [
  'react',
  'react-dom',
  'vite'
];

// Logging function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [INFO] ${message}`;
  console.log(logMessage);
  
  // Append to log file
  try {
    fs.appendFileSync(LOG_FILE, logMessage + '\n');
  } catch (error) {
    // Ignore log file errors
  }
}

// Check if file exists
function checkFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      log(`${filePath} ✓`);
      return true;
    } else {
      log(`${filePath} ✗ (missing)`);
      return false;
    }
  } catch (error) {
    log(`${filePath} ✗ (error: ${error.message})`);
    return false;
  }
}

// Check if dependency exists in node_modules
function checkDependency(depName) {
  try {
    const depPath = path.join('node_modules', depName);
    if (fs.existsSync(depPath)) {
      log(`${depName} ✓`);
      return true;
    } else {
      log(`${depName} ✗ (not installed)`);
      return false;
    }
  } catch (error) {
    log(`${depName} ✗ (error: ${error.message})`);
    return false;
  }
}

// Check if port is available
function checkPort(port) {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        log(`Port ${port} is available ✓`);
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      log(`Port ${port} is in use ✗`);
      resolve(false);
    });
  });
}

// Main check function
async function runPreDevCheck() {
  try {
    log(`Node.js ${process.version} ✓`);
    
    // Check required files
    let allFilesExist = true;
    for (const file of REQUIRED_FILES) {
      if (!checkFile(file)) {
        allFilesExist = false;
      }
    }
    
    // Check dependencies
    let allDepsExist = true;
    for (const dep of REQUIRED_DEPENDENCIES) {
      if (!checkDependency(dep)) {
        allDepsExist = false;
      }
    }
    
    // Check for .env file
    if (checkFile('.env')) {
      log('.env file found ✓');
    } else {
      log('.env file not found (optional)');
    }
    
    // Check if port is available
    const portAvailable = await checkPort(5199);
    
    if (!allFilesExist) {
      log('Some required files are missing!');
      process.exit(1);
    }
    
    if (!allDepsExist) {
      log('Some required dependencies are missing!');
      process.exit(1);
    }
    
    log('Pre-development checks completed successfully ✓');
    
  } catch (error) {
    log(`Pre-development check failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the checks
runPreDevCheck();