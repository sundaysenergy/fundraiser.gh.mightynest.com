mightynestApp
  .service('schoolSearch', function () {
    // Search Object
    var search = {
      settings: {},
      // cache the request, make one request per zip code
      caches: {},
      // cace the school information
      caches_schools: {},
      // cache the schools list
      schools: {},
      // cache the zip code list
      zip_codes: [],
      zips_caches: []
    };

    // Init function
    search.init = function (settings) {
      search.settings = settings;

      // #42154899
      if (search.settings.has_affiliate != 'undefined') {
        // Hide the form and return
        $("#" + search.settings.form_id).hide();

        // Show school details
        var $school_info = $('#' + search.settings.school_info);

        $.getJSON('/affiliate/info/' + search.settings.has_affiliate + '/json',
          function (data) {
            $school_info.find('.school-name > p').html(data.title);
            if (data.img_filepath != null) {
              $school_info.find('.school-name > img').attr('src', data.img_thumb_url);
            }

            // Replace link
            $('.school-fundraiser-link').attr('href', data.url);

            // Get more stats
            $.getJSON('/affiliate/stats/' + search.settings.has_affiliate + '/json', function (data) {
              $school_info.find('.school-footer span').eq(0).html(data.num_participated);
              if (data.order_total != null) {
                $school_info.find('.school-footer span').eq(1).html("$" + parseFloat(data.commission).toFixed(2));
              }
              $school_info.show();
            });
          });
        return;
      }

      // On complete page, close the form, replace text. That's all
      if (window.location.pathname.indexOf('complete') != -1) {
        // Hide label + form
        $("#" + search.settings.form_id).find('label,input').hide();
        var $p = $("#" + search.settings.form_id).find('p').eq(1);
        $p.html($p.html().replace('Pick your school below or ', ''));
        $p.find('a').text('Learn more');
        return;
      }

      // Check size of zip codes, and cache it
      if (search.zip_codes.length == 0) {
        var url = search.settings.json_file + '/zips' + search.settings.json_suffix;
        $.getJSON(url, function (data) {
          search.zip_codes = data;
        });
      }

      // Bind event
      search.search(settings.value);

      // Bind submit event
      $("#" + search.settings.form_id).bind('submit', function (event) {
        event.preventDefault();
        // get school_affiliate2_uid value
        var $input_element = $("#" + search.settings.input_element),
          school = $input_element.data('school'), school_affiliate2_uid = $("#" + search.settings.affiliate_uid_element).val();

        // Call to create school if it doesnot have school_affiliate2_uid
        if (typeof school.school_affiliate2_uid == 'undefined') {
          $.ajax({
            async: false,
            url: search.settings.base_path + 'affiliate/create/' + school.school_id + '/json',
            dataType: 'json',
            success: function (data) {
              school.school_affiliate2_uid = data.affiliate_id;
              $input_element.data('school', school);
              //search.caches_schools[ui.item.value] = school_info;
            }
          });
        }

        var redirect_url = '';
        if (school_affiliate2_uid != 0) {
          // redirect to /affiliate/[uc_affiliate2_uid]/cart or /affiliate/[uc_affiliate2_uid]/cart/checkout
          // #42152817
          redirect_url = search.settings.base_path + 'affiliate/' + school_affiliate2_uid + '/cart';
        }
        else {
          // redirect to /affiliate/create/[school-id]
          redirect_url = search.settings.base_path + 'affiliate/create/' + school.school_id;
        }

        if (window.location.pathname.indexOf('checkout') != -1) {
          redirect_url = redirect_url + '/checkout';
        }

        // Redirect on Drupal page, not on learmore page
        if ($('#school-submit-2').size() == 0) {
          location.href = redirect_url;
        }
      });
    };

    // old school_get function
    search.get = function (id, cache_id) {
      var url = search.settings.json_file + '/zips/' + id + search.settings.json_suffix;
      if (typeof search.schools[cache_id] == 'undefined') {
        search.schools[cache_id] = [];
      }

      $.ajax({
        async: false,
        url: url,
        dataType: 'json',
        success: function (data) {
          search.schools[cache_id] = search.schools[cache_id].concat(data);
        }
      });
    };

    search.zipcode = function (zipcode, cache_id) {
      if (5 == zipcode.length) {
        if (0 != zipcode[0]) {
          zipcode = parseInt(zipcode);
        }

        var zipcode_found = $.inArray(zipcode, search.zip_codes);
        if (zipcode_found > -1) {
          // Zip code was found in our database.
          var zipcode_cache = $.inArray(zipcode, search.zips_caches);
          if (zipcode_cache == -1) {
            search.zips_caches.push(zipcode);
            search.get(zipcode, cache_id);
          }
          return zipcode;
        }
      }
      return false;
    };

    search.search = function (id) {
      var zipcode = search.zipcode(id, id);
      if (false == zipcode) {
        return false;
      }

      // Check the cache
      var nearby = [];
      if (typeof search.caches[id] != 'undefined') {
        nearby = search.caches[id];
      }
      else {

        //       $.ajax({
        //       async: false,
        //       url: 'http://api.zippopotam.us/nearby/us/' + id,
        //       dataType: 'json',
        //       success: function(data){
        //       search.caches[id] = data.nearby;
        //       nearby = search.caches[id];
        //       }
        //       });

      }

      $.each(nearby, function (key, val) {
        search.zipcode(val['post code'], zipcode);
      });

      // Setup autocomplete
      $("#" + search.settings.input_element).autocomplete({
        minLength: 0,
        source: search.schools[zipcode],
        select: function (event, ui) {

          // Make request to get more information
          var school_info = {};

          if (typeof search.caches_schools[ui.item.value] != 'undefined') {
            school_info = search.caches_schools[ui.item.value];
          }
          else {
            var zipcode_string = ui.item.value;
            var url = search.settings.json_file + '/schools/' + zipcode_string.slice(0, 2) + '/' + zipcode_string.slice(2, 4) + '/' + zipcode_string + search.settings.json_suffix;
            $.ajax({
              async: false,
              url: url,
              dataType: 'json',
              success: function (data) {
                search.caches_schools[ui.item.value] = data;
                school_info = data;
              }
            });
          }

          $("#" + search.settings.input_element).val(ui.item.label).data('school', school_info);
          $("#" + search.settings.update_element).val(ui.item.value);
          // show the submit and add data
          $("#" + search.settings.submit_element).show();
          var school_affiliate2_uid = 0;

          if (typeof school_info.uc_affiliate2_uid != 'undefined') {
            school_affiliate2_uid = school_info.uc_affiliate2_uid;
          }

          $("#" + search.settings.affiliate_uid_element).val(school_affiliate2_uid);
          // Tab key
          $(this).val(ui.item.label);
          return false;
        },

        focus: function (event, ui) {
          // Only replace value on the textbox when event fire with keyboard - issue with hover before
          if (event.which != 1) {
            event.preventDefault();
            //$(this).val(ui.item.label);
          }
        }

      }).data("autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
          .data("item.autocomplete", item)
          .append("<a><span class='school-name'>" + item.label + "</span><br>" + item.desc + "</a>")
          .appendTo(ul);
      };

      // Let the tab doesnot close autocomplete
      $("#" + search.settings.input_element).bind("keydown.autocomplete", function (e) {
        var keyCode = $.ui.keyCode;
        if (e.keyCode == keyCode.TAB) {
          // Move to next item
          $(this).autocomplete("search", "");
          var $this = $(this).data('autocomplete');
          $this._keyEvent("next", e);
        }
      });

      $("#" + search.settings.select_element).show();
      $("#" + search.settings.update_element).show();

      // vaild zip code, show all school
      // pass empty string as value to search for, displaying all results
      $("#" + search.settings.input_element).autocomplete("search", "").focus();
    };

    return search;
  });
