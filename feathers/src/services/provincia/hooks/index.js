'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [],
  find: [
    globalHooks.search({field: 'nombre'}),
    auth.verifyToken(),
    auth.populateUser(),
  //  auth.restrictToAuthenticated()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  //  auth.restrictToOwner({ ownerField: 'id' })
  ],
  create: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  //  auth.restrictToOwner({ ownerField: 'id' })
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  //  auth.restrictToOwner({ ownerField: 'id' })
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  //  auth.restrictToOwner({ ownerField: 'id' })
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
  //  auth.restrictToOwner({ ownerField: 'id' })
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
