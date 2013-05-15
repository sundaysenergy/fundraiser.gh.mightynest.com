'use strict';

/* Controllers */

  // 42 http://mightynest.com/mightynest/user/json
mightynestApp
  .controller('FaqCtrl', function ($scope, $http, $filter, config, jsyamlHelper) {

    $scope.activeItem = null;

    $scope.parseFaqItems = function (rawItems) {
      var items = [];
      angular.forEach(rawItems, function (rawItem) {
        var item = yaml_front(rawItem.content);
        var mdConverter = new Showdown.converter();
        item.html = mdConverter.makeHtml($filter('linky')(item.text));
        items.push(item);
      });
      return items;
    };

    $scope.showItem = function (index, event) {
      if (event) event.preventDefault();
      $scope.activeItem = index;
    };

    $http.get(config.URLS.FAQ)
      .success(function (response) {
        $scope.faqItems = $scope.parseFaqItems(response);
        $scope.showItem(0);
      });

    function yaml_front (string) {
      var text = string
        , attributes = {}
        , match = matcher(string, '---');

      if (match) {
        attributes = jsyamlHelper.parse(match[2]);
        text = string.replace(match[0], '');
      }

      return { attributes: attributes, text: text }
    }

    function matcher(string, separator) {
      separator = separator || '---';
      var pattern = '^('
          + separator
          + '$([\\s\\S]*?)'
          + separator + '$\\n)'
        , regex = new RegExp(pattern, 'm')
        , match = regex.exec(string);

      if (match && match.length > 0) return match
    }

    $scope.order = function (item) {
      return item.attributes.order;
    };
  });