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

    var domain = 'http://mightynest.com/';

    // first
    $http.get(domain + 'affiliate/info/' + $routeParams.schoolId + '/json')
      .success(function (response) {
        console.log('we are fine with', response);

        // second
        $http.get(domain + response.json_file)
          .success(function (response) {
            console.log('We are even better with', response);

            // @XXX very nasty code
            window.z7x3p3;
            var s = document.createElement('script');
            s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
            s.onload = s.onreadystatechange = function() {
            var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
            };
            var scr = document.getElementsByTagName('script')[0],
              par = scr.parentNode;
            par.insertBefore(s, scr);

          });
      });
  });
