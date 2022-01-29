const express = require('express');
const app = express();
const routes = require('./routes');
var cors = require('cors')
const passport = require('passport');
const msal_config = require('./config');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const options = {
    identityMetadata: `https://${msal_config.metadata.authority}/${msal_config.credentials.tenantID}/${msal_config.metadata.version}/${msal_config.metadata.discovery}`,
    issuer: `https://${msal_config.metadata.authority}/${msal_config.credentials.tenantID}/${msal_config.metadata.version}`,
    clientID: msal_config.credentials.clientID,
    audience: msal_config.credentials.clientID, // audience is this application
    validateIssuer: msal_config.settings.validateIssuer,
    passReqToCallback: msal_config.settings.passReqToCallback,
    loggingLevel: msal_config.settings.loggingLevel,
    scope: msal_config.protectedRoutes.all.scopes
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
        // Send user info using the second argument
        done(null, {}, token);
    }
);



module.exports = (config) => {
  const log = config.log();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('uploads'));

  app.use(passport.initialize());

  passport.use(bearerStrategy);

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
  // enable CORS (in production, modify as to allow only designated origins)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// exposed API endpoint
app.get('/medidas',
    passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('Validated claims: ', req.authInfo);

        // Service relies on the name claim.  
        res.status(200).json({
            'name': req.authInfo['name'],
            'issued-by': req.authInfo['iss'],
            'issued-for': req.authInfo['aud'],
            'scope': req.authInfo['scp']
        });
    }
);
 
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
