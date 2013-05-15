'use strict';

/* Controllers */
mightynestApp
  .controller('SearchSchoolCtrl', function ($scope, schoolSearch, $http, config) {

    $scope.zipcode = null;
    $scope.school = null;

    $scope.showAddSchool = false;

    $scope.searchSchool = function () {
      $('#find-your-school').submit();
      $('#school-submit-2').attr('disabled', 'disabled');
      $('#wufoo-Modal').modal();
      // Add Google Event
      _gaq.push(['_trackEvent', 'MS_learn_more', 'form submit', 'discover how']);
    };

    // #42823885
    $('#school').on('autocompleteselect', function (event, ui) {
      // Check valid school
      if (typeof ui.item.value != 'undefined') {
        $('#school-submit-2').removeAttr('disabled');

        $scope.showAddSchool = true;

        _gaq.push(['_trackEvent', 'MS_cart_selector', 'form entry', $scope.zipcode]);
        _gaq.push(['_trackEvent', 'MS_learn_more', 'form entry', $scope.zipcode]);
      }
    });

    // Create plugin
    var school_complete = function (element, options) {
      var settings = $.extend({
        base_path: '/',
        json_file: 'json',
        json_suffix: '.json',
        update_element: '',
        input_element: '',
        submit_element: '',
        select_element: '',
        affiliate_uid_element: '',
        has_affiliate: 'undefined',
        form_id: '',
        school_info: '',
        donate_amount: 'donate-amount'
      }, options);

      $(element).each(function () {
        // Default value
        settings.value = $(this).val();
        schoolSearch.init(settings);

        // Call again after have change
        $(this).bind('keyup', function () {
          schoolSearch.search($(this).val());
        });
      });
    };

    school_complete('#target', {
        json_file: Drupal.settings.affiliate_create_json_file_path,
        update_element: 'school-id',
        affiliate_element: 'school-affiliate2-uid',
        input_element: 'school',
        submit_element: 'school-submit',
        select_element: 'school-select',
        affiliate_uid_element: 'school-affiliate2-uid',
        form_id: 'find-your-school',
        json_suffix: '.txt',
        has_affiliate: Drupal.settings.affiliate
      });

  });