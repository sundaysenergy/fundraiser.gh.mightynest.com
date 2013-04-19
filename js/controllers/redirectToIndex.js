'use strict';

/* Controllers */
  // 42 http://mightynest.com/mightynest/user/json
mightynestApp
  .controller('RedirectToIndexCtrl', function () {
    window.hash = '';
    window.location = '/fundraiser/index.html';
  });