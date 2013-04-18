'use strict';

describe('Controller: RedirectToIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('mightynestApp'));

  var controller,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    controller = $controller('RedirectToIndexCtrl', {
      $scope: scope
    });
  }));
});