const express = require('express');
const next = require('next');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const apiRoutes = require('./server/routes');
const passportStrategy = require('./server/strategies');
// const renderAndCache = require('./utils').renderAndCache;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

Object.keys(passportStrategy).forEach((strategy) => {
  passport.use(strategy);
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
  server.use(bodyParser.urlencoded({ extended: false }));

  server.use(passport.initialize());
  server.use(passport.session());

  // Use the `renderAndCache` utility defined below to serve pages
  // server.get('/', (req, res) => {
  //   renderAndCache(app, req, res, '/');
  // });

  server.use('/api', apiRoutes);

  server.get('*', (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
