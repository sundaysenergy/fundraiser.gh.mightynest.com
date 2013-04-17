'use strict';

/* Controllers */
angular.module('mightynestApp')
  .controller('SchoolInfoCtrl', function ($scope, $http, $routeParams) {

    $scope.schoolId = $routeParams.schoolId;
    $scope.userId = null;

    // prepare response to be passed to Wufoo
    var mapResponseToWufoo = function (properties) {
      var mapping = {
          //wufooFiedId : jsonFileFieldId
          'Field12': 'school_name',
          'Field20': 'school_id',
          'Field25': 'mail_address',
          'Field26': 'mail_city',
          'Field27': 'mail_state',
          'Field28': 'mail_zip',
          'Field29': 'mail_zip4',
          'Field30': 'phone',
          'Field31': 'num_students',
          'Field32': 'lowest_grade',
          'Field33': 'highest_grade',
          'Field34': 'source'
        },
        prepopulated = {
          'Field23': $scope.schoolId,
          'Field42': $scope.userName,
          'Field48': $scope.userId,
          'Field21': $scope.schoolUrl,
        },
        result = [];

      angular.forEach(mapping, function (item, index) {
        if (!properties[item]) return;
        result.push(index + '=' + encodeURI(properties[item]));
      });

      angular.forEach(prepopulated, function (item, index) {
        if (!item) return;
        result.push(index + '=' + item);
      });

      return result.join('&')
    };

    var domain = 'http://mightynest.com/';

    // first
    $http
      .get(domain + 'affiliate/info/' + $scope.schoolId + '/json/FULL_LOAD')
      .success(function (response) {
        $scope.schoolUrl = response.url;

        var jsonFile = response.data;
        var user = response.request_user;

        // get user id
        $scope.userId = user.uid;
        $scope.userName = user.name || '';

        // @XXX now it works but still crappy
        // fire up Wufoo form
        window.p7x0r9;
        var s = document.createElement('script'),
          options = {
            userName: 'mightynest',
            formHash: 'p7x0r9',
            autoResize: true,
            height: '400',
            async: true,
            header: 'hide',
            defaultValues: mapResponseToWufoo(jsonFile)
          };

        s.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.wufoo.com/scripts/embed/form.js';
        s.onload = s.onreadystatechange = function () {
          var rs = this.readyState;
          if (rs) if (rs != 'complete') if (rs != 'loaded') return;
          try {
            window.p7x0r9 = new WufooForm();
            window.p7x0r9.initialize(options);
            window.p7x0r9.display();
          } catch (e) {
            console.error(e);
          }
        };
        var scr = document.getElementsByTagName('script')[0], par = scr.parentNode;
        par.insertBefore(s, scr);

      });
  });
