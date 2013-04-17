'use strict';

describe('Controller: SchoolInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('mightynestApp'));

  var controller, scope, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    controller = $controller('SchoolInfoCtrl', { $scope: scope, $routeParams: {schoolId: 1} });

    httpBackend.whenGet('http://mightynest.com/affiliate/info/1/json/FULL_LOAD')
      .respond({})
  }));

  beforeEach(function () {
    httpBackend.expectGet('http://mightynest.com/affiliate/info/1/json/FULL_LOAD');
    httpBackend.flush();
  });

  xdescribe('mapResponseToWufoo', function () {
    var mapped;
    beforeEach(function () {
      scope.schoolId = 'school1';
      scope.userName = 'username1';
      scope.userId = 'userid1';
      scope.schoolUrl = 'schoolUrl';

      mapped = scope.mapResponseToWufoo({
        'school_name': 1,
        'school_id': 2,
        'mail_address': 3,
        'mail_city': 4,
        'mail_state': 5,
        'mail_zip': 6,
        'mail_zip4': 7,
        'phone': 8,
        'num_students': 9,
        'lowest_grade': 10,
        'highest_grade': 11,
        'source': 12
      });
    });

    it('should init mapped fields with values', function () {
      expect(mapped).toContainOnce()
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
});