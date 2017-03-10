import React from 'react';

import { Admin, Resource, fetchUtils } from 'admin-on-rest';
//import myApiRestClient from './feathers';
import myApiRestClient from 'aor-feathers-client';

import { ProvinciaList, ProvinciaEdit, ProvinciaCreate } from './Provincia';
import { Delete } from 'admin-on-rest/lib/mui';
import authClient from './authClient';



const httpClient = (url, options) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('feathers-jwt');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const restClient = myApiRestClient('http://localhost:3030', httpClient);

const App = () => (
//    <Admin restClient={jsonServerRestClient('http://localhost:3030')}>
    <Admin restClient={restClient} authClient={authClient}>
        <Resource name="provincias" list={ProvinciaList} create={ProvinciaCreate} edit={ProvinciaEdit} remove={Delete} />
    </Admin>
);

export default App;
