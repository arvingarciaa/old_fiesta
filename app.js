'use strict';
/*************************
  Module Dependencies
*************************/
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const config = require('./config/config.js');
const database = require('./lib/database');
const config_tech = require('./config/config_tech.js');
const database_tech = require('./lib/database_tech');
const appRouter = require('./routes/app/router');
const databaseRouter = require('./routes/db/router');

const app = express();

/*************************
  Connect to database
*************************/
database.connect(function (res) {
  if (!res.success) {
    // stop app if not connected to database
    throw new Error(res.message);
  }
});

database_tech.connect(function (res) {
  if (!res.success) {
    // stop app if not connected to database
    throw new Error(res.message);
  }
});

/*************************
  View engine setup
*************************/
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

/*************************
  Configure settings
*************************/
app.use(config.cors); /* cross-origin resource sharing */
app.set('case sensitive routing', true);
app.set('x-powered-by', false);
// if(process.env.NODE_ENV != 'development')
  app.set('view cache', true);

/*************************
  Middlewares
*************************/
app.use(compression());
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

/*************************
  Public files
*************************/
app.use(favicon(path.join(__dirname, 'public/assets', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

/*************************
  Routes
*************************/
app.use('/api', mongoSanitize(), databaseRouter);
app.use('/', appRouter);

/*************************
  Error Handling
*************************/
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  let url = '/lost?why=something_went_wrong'+ ((req.url.startsWith('/admin'))? '&admin=true': '');
  res.redirect(url);
});

// DONE
module.exports = app;
