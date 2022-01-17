const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');
require('dotenv').config();
// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

// Configuration options for different environments
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    mysql: {
      options: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: 'mysql',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
      },
      client: null
    },
    log: () => getLogger(name, version, 'debug'),
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info'),
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal'),
  },
};
