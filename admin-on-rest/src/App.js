import React from 'react';

import { Admin, Resource, fetchUtils } from 'admin-on-rest';

import { ProvinciaList, ProvinciaEdit, ProvinciaCreate } from './Provincia';
import { Delete } from 'admin-on-rest/lib/mui';

import { authClient, restClient } from './aor-feathers-client';
import feathersClient from './feathersClient';

const App = () => (
    <Admin
        authClient={authClient(feathersClient)}
        restClient={restClient(feathersClient)}
    >
        <Resource name="provincias" list={ProvinciaList} create={ProvinciaCreate} edit={ProvinciaEdit} remove={Delete} />
    </Admin>
);

export default App;
