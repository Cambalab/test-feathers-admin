import 'angular';
import 'ng-admin';
import css from 'ng-admin/build/ng-admin.min.css';

var myApp = angular.module('myApp', ['ng-admin']);
myApp
  .config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
    var nga = NgAdminConfigurationProvider;

    var admin = nga.application('My Ng-Admin Panel')
      .debug(true)
      .baseApiUrl('http://localhost:3030/');

    var provincia = nga.entity('provincias');

    provincia.listView()
      .title('All items') // default title is "[Entity_name] list"
      .description('List of provincias') // description appears under the title
      //.infinitePagination(true) // load pages as the user scrolls
      .fields([
        nga.field('id').label('id'), // The default displayed name is the camelCase field name. label() overrides id
        nga.field('nombre') // the default list field type is "string", and displays as a string
      ])
      .listActions(['show', 'edit', 'delete'])
      .filters([
        nga.field('q')
          .label('')
          .pinned(true)
          .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')
          .transform(v => v && v.toUpperCase()) // transform the entered value before sending it as a query parameter
          .map(v => v && v.toLowerCase()), // map the query parameter to a displayed value in the filter form
        ]);

    provincia.creationView()
      .fields([
        nga.field('nombre')
      ]);
    provincia.editionView()
      .fields([
        nga.field('nombre')
      ]);
    provincia.showView()
      .fields([
        nga.field('id').label('id'),
        nga.field('nombre')
      ]);

    admin.addEntity(provincia);
    nga.configure(admin);
  }])
  .config(function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
      if (operation === 'getList') {
        if (params._page) {
          params.$limit = params._perPage;
          params.$skip = params._perPage * (params._page - 1);
          delete params._page;
          delete params._perPage;
        }

        if (params._sortField) {
          const sortKey = '$sort[' + params._sortField + ']';
          const sortVal = (params._sortDir === 'DESC') ? -1 : 1;
          params[sortKey] = sortVal;
          delete params._sortField;
          delete params._sortDir;
        }

        if (params._filters) {
          for (var filter in params._filters) {
            params[filter] = params._filters[filter];
          }
          delete params._filters;
        }

      }

      return {params: params};
    });

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (operation == "getList") {
        response.totalCount = data.total;
        return data.data;
      }
      return data;
    });
  });
