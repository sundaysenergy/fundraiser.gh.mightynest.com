'use strict';

/* Controllers */

// 42 http://mightynest.com/mightynest/user/json
mightynestApp
  .controller('HeaderContentCtrl', function ($scope, $http, config, jsyamlHelper) {

    $http.get(config.URLS.HEADER_CONTENT, config.GITHUB_HEADERS)
      .success(function (response) {
        $scope.content = yaml_front(response);
      });

    function yaml_front (string) {
      var attributes = {}
        , match = matcher(string, '---');

      if (match) {
        attributes = jsyamlHelper.parse(match[2]);
      }

      return attributes;
    }

    function matcher (string, separator) {
      separator = separator || '---';
      var pattern = '^('
          + separator
          + '$([\\s\\S]*)$)'
        , regex = new RegExp(pattern, 'm')
        , match = regex.exec(string);

      if (match && match.length > 0) return match
    }

  });