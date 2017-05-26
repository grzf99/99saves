const express = require('express');
const next = require('next');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const basicAuth = require('basic-auth-connect');
const cors = require('cors');
// loading env variables from .env file
require('dotenv').config();

const startClockwork = require('./server/clockwork');
const startQueue = require('./server/delayed-jobs');
const apiRoutes = require('./server/routes');
const passportStrategies = require('./server/strategies');
const { User } = require('./server/models');
// const renderAndCache = require('./utils').renderAndCache;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

Object.keys(passportStrategies).forEach((strategy) => {
  passport.use(strategy, passportStrategies[strategy]);
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use(logger('dev'));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(cookieParser());

  server.use(passport.initialize());
  server.use(passport.session());

  // Use the `renderAndCache` utility defined below to serve pages
  // server.get('/', (req, res) => {
  //   renderAndCache(app, req, res, '/');
  // });
  server.options('*', cors());

  server.use('/api', apiRoutes);
  if(process.env.NODE_ENV === 'production' && (!!process.env.REQUIRE_LOGIN && !!process.env.REQUIRE_PASSWORD)) 
    server.use(basicAuth(process.env.REQUIRE_LOGIN, process.env.REQUIRE_PASSWORD));
  
  server.get('/offer/:saveId', (req, res) => {
    const { saveId } = req.params;
    app.render(req, res, '/offer', Object.assign({}, req.query, { saveId }));
  });
  server.get('/feedback/:saveId', (req, res) => {
    const { saveId } = req.params;
    app.render(req, res, '/feedback', Object.assign({}, req.query, { saveId }));
  });
  server.get('*', (req, res) => handle(req, res));

  startClockwork();
  startQueue();
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
