'use strict';

/* App Module */
angular.module('mightynestApp', [])
  .config(function ($routeProvider) {

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
