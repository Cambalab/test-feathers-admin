'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

export const search = options => { // always wrap in a function so you can pass options and for consistency.
  return hook => {

    if (hook.params.query.q) {
      hook.params.query[options.field] = { $like : hook.params.query.q + '%'};
      delete hook.params.query.q;
    }

    return Promise.resolve(hook); // A good convention is to always return a promise.
  };
};
