'use strict';

/* Controllers */
angular.module('mightynestApp')

  // 42 http://mightynest.com/mightynest/user/json

  .controller('RedirectToIndexCtrl', function () {
    window.hash = '';
    window.location = '/fundraiser/index.html';
  });