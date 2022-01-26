const express = require('express');
const app = express();
const routes = require('./routes');
var cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:8081/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} 


module.exports = (config) => {
  const log = config.log();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('uploads'));
  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
  app.use(cors());
  app.use('/', routes(config));

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
};
