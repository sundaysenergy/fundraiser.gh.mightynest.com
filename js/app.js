'use strict';

/* App Module */
angular.module('mightynestApp', [])
  .config(function ($routeProvider) {

    /* Routes */
    $routeProvider
      /* Route for getting school_id into parameter */
      .when('/school/:schoolId', {
        templateUrl: 'views/school.html',
        controller: 'SchoolCtrl'
      })
      /* Default route */
      .when('/', {
        templateUrl: 'views/form.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
