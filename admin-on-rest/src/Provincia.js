import React from 'react';
import { Filter, DisabledInput, ReferenceInput, List, Edit, Create, SimpleForm, Datagrid, TextField, SelectInput, TextInput, EditButton } from 'admin-on-rest/lib/mui';

export const ProvinciaFilter = (props) => (
   <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="Provincia" source="id" reference="provincias" allowEmpty>
      <SelectInput optionText="nombre" />
    </ReferenceInput>
   </Filter>
);

export const ProvinciaList = (props) => (
    <List {...props} filters={<ProvinciaFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="nombre" />
            <EditButton />
        </Datagrid>
    </List>
);

const ProvinciaNombre = ({ record }) => {
    return <span>Provincia {record ? `"${record.nombre}"` : ''}</span>;
};

export const ProvinciaEdit = (props) => (
    <Edit nombre={<ProvinciaNombre />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="nombre" />
        </SimpleForm>
    </Edit>
);

export const ProvinciaCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="nombre" />
        </SimpleForm>
    </Create>
);
