'use strict';

/* Controllers */
angular.module('mightynestApp')

  // http://mightynest.com/affiliate/info/:schoolId/json
  // http://mightynest.com/affiliate/stats/11174/json
  // school_id = 20
  // affiliate_id = 23

  // 42 http://mightynest.com/mightynest/user/json

  .controller('RedirectToIndexCtrl', function () {
    window.location = '/index.html';
  })

  .controller('SchoolInfoCtrl', function ($scope, $http, $routeParams) {
    // need to query

    $http.get('http://mightynest.getsum.net/proxy/affiliate/info/' + $routeParams.schoolId + '/json')
      .success(function (response) {
        console.log('we are fine with', response);
      })
  });
