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

    // prepare response to be passed to Wufoo
    var mapResponseToWufoo = function (properties) {
      var mapping = {
          // school_name =  organization  = Field12
          'Field12': 'school_name',
          //  MS school_id  = Field20
          'Field20': 'school_id',
          //  MS Affiliate ID  = Field23
          'Field23': 'school_affiliate2_uid',
          // MS self-signup = 'more info',
          //'Field24': '',
          //mail_address  = Field25
          'Field25': 'mail_address',
          // mail_city = Field26
          'Field26': 'mail_city',
          // mail_state = Field27
          'Field27': 'mail_state',
          // mail_zip = Field28
          'Field28': 'mail_zip',
          // mail_zip4 = Field29
          'Field29': 'mail_zip4',
          //  school phone  = Field30
          'Field30': 'phone',
          //  MS School Size  = Field31
          'Field31': 'num_students',
          // MS Grade - start  = Field32
          'Field32': 'lowest_grade',
          //  MS Grade - end  = Field33
          'Field33': 'highest_grade',
          //  MS School Type  = Field34
          'Field34': 'source'
          //  MS Sign-up Date  = Field35
          //'Field35':
          //  MS Start Year  = Field36
          //'Field36':
          //  MS URL  = Field21
          //  Lead Source  = Field37
          //'Field37': 'mightynest.com',
          // Lead Medium  = Field38
          //'Field38': 'self-signup'
        },
        result = [];
      angular.forEach(mapping, function (item, index) {
        if (!properties[item]) return;
        result.push(index + '=' + encodeURI(properties[item]));
      });
      return result.join('&')
    };

    var domain = 'http://mightynest.com/';

    // first
    $http.get(domain + 'affiliate/info/' + $routeParams.schoolId + '/json')
      .success(function (response) {

        // second
        $http.get(domain + response.json_file)
          .success(function (response) {
            // @XXX now it works but still crappy
            window.p7x0r9;
            var s = document.createElement('script'),
              options = {
                userName: 'mightynest',
                formHash: 'p7x0r9',
                autoResize: true,
                height: '400',
                async: true,
                header: 'hide',
                defaultValues: mapResponseToWufoo(response)
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
  });
