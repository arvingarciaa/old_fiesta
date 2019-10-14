/******************************************************
* Configuration file for Fiesta App
* - cross-origin resource sharing
******************************************************/
process.env.NODE_ENV = 'development';
module.exports = (function (env) {
  var config = {};
  switch (env) {
    case 'production':
      config = require('../env/production');
      break;

    case 'development':
      config = require('../env/development_tech');
      break;

    case 'staging':
      config = require('../env/staging');
      break;

    default:
      console.error('NODE_ENV environment variable not set');
      process.exit(1);
  }

  return config;
})(process.env.NODE_ENV);
