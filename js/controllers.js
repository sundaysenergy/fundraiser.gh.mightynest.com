'use strict';

/* Controllers */
angular.module('mightynestApp')

  .controller('RedirectToIndexCtrl', function ($location) {
    $location.url('/index.html');
  })

  .controller('SchoolInfoCtrl', function ($scope, $http, $routeParams) {
    // need to query

    $http.get('http://mightynest.com/affiliate/info/' + $routeParams.schoolId + '/json')
      .success(function (response) {
        console.log('we are fine with', JSON.stringify(response));
      })
  });
