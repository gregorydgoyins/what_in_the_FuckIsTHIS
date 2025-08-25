const fs = require('fs');
const path = require('path');
const net = require('net');

// Configuration
const REQUIRED_NODE_VERSION = '18.0.0';
const DEFAULT_PORT = 5199;
const LOG_FILE = 'pre-dev-check.log';

// Logging function
function log(level, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}`;
  console.log(logEntry);
  
  try {
    fs.appendFileSync(LOG_FILE, logEntry + '\n');
  } catch (err) {
    // Ignore logging errors to avoid blocking startup
  }
}

// Check Node.js version
function checkNodeVersion() {
  const currentVersion = process.version;
  log('INFO', `Node.js ${currentVersion} ✓`);
  
  // Parse version numbers for comparison
  const current = currentVersion.replace('v', '').split('.').map(Number);
  const required = REQUIRED_NODE_VERSION.split('.').map(Number);
  
  // Simple version comparison
  for (let i = 0; i < 3; i++) {
    if (current[i] > required[i]) break;
    if (current[i] < required[i]) {
      log('ERROR', `Node.js version ${currentVersion} is below required ${REQUIRED_NODE_VERSION}`);
      process.exit(1);
    }
  }
}

// Check if a file exists
function checkFile(filePath, description = null) {
  const name = description || path.basename(filePath);
  if (fs.existsSync(filePath)) {
    log('INFO', `${name} ✓`);
    return true;
  } else {
    log('ERROR', `${name} not found`);
    return false;
  }
}

// Check if a package is installed
function checkPackage(packageName) {
  try {
    const packagePath = path.join('node_modules', packageName);
    if (fs.existsSync(packagePath)) {
      log('INFO', `${packageName} ✓`);
      return true;
    } else {
      log('ERROR', `${packageName} not found in node_modules`);
      return false;
    }
  } catch (err) {
    log('ERROR', `Error checking package ${packageName}: ${err.message}`);
    return false;
  }
}

// Check if port is available
function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        log('INFO', `Port ${port} is available ✓`);
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      log('ERROR', `Port ${port} is not available`);
      resolve(false);
    });
  });
}

// Main check function
async function runChecks() {
  log('INFO', 'Starting pre-development checks...');
  
  let allChecksPassed = true;
  
  // Check Node.js version
  try {
    checkNodeVersion();
  } catch (err) {
    allChecksPassed = false;
  }
  
  // Check essential project files
  const requiredFiles = [
    'package.json',
    'vite.config.ts', 
    'tsconfig.json',
    'src/main.tsx',
    'src/App.tsx',
    'index.html'
  ];
  
  for (const file of requiredFiles) {
    if (!checkFile(file)) {
      allChecksPassed = false;
    }
  }
  
  // Check core packages
  const requiredPackages = [
    'react',
    'react-dom', 
    'vite'
  ];
  
  for (const pkg of requiredPackages) {
    if (!checkPackage(pkg)) {
      allChecksPassed = false;
    }
  }
  
  // Check for .env file (optional)
  if (checkFile('.env', '.env file found')) {
    // .env exists
  } else {
    log('WARN', '.env file not found - using defaults');
  }
  
  // Check port availability
  const portAvailable = await checkPort(DEFAULT_PORT);
  if (!portAvailable) {
    allChecksPassed = false;
  }
  
  if (allChecksPassed) {
    log('INFO', 'All pre-development checks passed ✓');
    process.exit(0);
  } else {
    log('ERROR', 'Pre-development checks failed ✗');
    process.exit(1);
  }
}

// Run the checks
runChecks().catch((err) => {
  log('ERROR', `Unexpected error during checks: ${err.message}`);
  process.exit(1);
});