'use strict';

/* App Module */
var mightynestApp = angular.module('mightynestApp', ['ngSanitize'])
  .config(function ($routeProvider, $httpProvider) {

    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    /* Routes */
    $routeProvider
      /* Route for getting school_id into parameter */
      .when('/school/:schoolId', {
        template: 'SchoolInfo',
        controller: 'SchoolInfoCtrl'
      })
      /* Default route */
      .when('/', {
        template: 'Redirecting...',
        controller: 'RedirectToIndexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
