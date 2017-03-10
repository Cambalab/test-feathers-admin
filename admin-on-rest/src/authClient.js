import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from 'admin-on-rest';
import 'es6-shim/es6-shim.min.js';

import feathers from 'feathers-client';
//import IO from 'socket.io-client';

const host = 'http://localhost:3030';
//const socket = IO(host);
const app = feathers()
  .configure(feathers.rest(host).fetch(window.fetch.bind(window)))
//  .configure(feathers.socketio(socket, {timeout:3000}))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

export default (type, params) => {
    if (type === AUTH_LOGIN) {
      const { username, password } = params;
      // console.log('auth_login ', username, password);

      return new Promise(function(resolve, reject) {
      app.authenticate({
          type: 'local',
          'email': username,
          'password': password
      }).then(function(result){
        // console.log('Authenticated!', app.get('token'));
        localStorage.setItem('username', username);
        //localStorage.setItem('token', app.get('token'));
        return resolve();
      }).catch(function(error){
        console.error('Error authenticating!', error);
        return reject();
      });
    }
    );

    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        //localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
      return localStorage.getItem('feathers-jwt') ? Promise.resolve() : Promise.reject();
    }

    return Promise.reject('Unkown method');
};
