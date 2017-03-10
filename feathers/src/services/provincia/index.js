'use strict';

const service = require('feathers-sequelize');
const user = require('./provincia-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: user(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/provincias', service(options));

  // Get our initialize service to that we can bind hooks
  const provinciaService = app.service('/provincias');

  // Set up our before hooks
  provinciaService.before(hooks.before);

  // Set up our after hooks
  provinciaService.after(hooks.after);
};
