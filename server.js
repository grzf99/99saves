const express = require('express');
const next = require('next');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const apiRoutes = require('./server/routes');
const passportStrategies = require('./server/strategies');
// const renderAndCache = require('./utils').renderAndCache;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

Object.keys(passportStrategies).forEach((strategy) => {
  passport.use(strategy, passportStrategies[strategy]);
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

Object.keys(passportStrategies).forEach((strategy) => {
  passport.use(strategy, passportStrategies[strategy]);
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.prepare()
.then(() => {
  const server = express();
  server.use(logger('dev'));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(passport.initialize());
  server.use(passport.session());

  server.use(passport.initialize());
  server.use(passport.session());

  // Use the `renderAndCache` utility defined below to serve pages
  // server.get('/', (req, res) => {
  //   renderAndCache(app, req, res, '/');
  // });

  server.use('/api', apiRoutes);
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
