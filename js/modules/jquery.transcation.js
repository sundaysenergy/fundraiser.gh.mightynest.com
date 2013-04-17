(function ($) {
  $(function() {
    var api_key = '';
    $.ajax({
      url: 'http://mightynest.com/getsum/api',
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        api_key = data.api_key;
        if (api_key.length == 0) {
          return;
        }

        var $school_list = $('#school_list');
        // Get list school
        $.getJSON('http://mightynest.getsum.net/proxy/affiliate/list/json', function (data) {
          $.each(data, function (index, item) {
            var $option = $('<option />').attr('value', index).html(item);
            $school_list.append($option);
          });
          $school_list.chosen();
        });
        // Function update url
        function update_url() {
          var school_list = $('#school_list').val(),
            value_tag = $('#value_tag').val(),
            value = $('#value').val();

          var data = {
            entity_source: 'mightynest',
            entity_tag: 'affiliate',
            entity_type: 'user',
            source: 'mightynest',
            source_type: 'user',
            source_id: 'user id'
          }
          if (school_list != '' && value_tag != '' && value != '') {
            data.entity_id = school_list;
            data.value = value;
            data.value_tag = value_tag;

            var final_url = 'http://api.getsum.net/create?api_key=' + api_key;
            $.each(data, function (i, item) {
              final_url += '&' + i + '=' + item;
            });
            $('#final_url').val(final_url);
            $('#create').removeAttr('disabled');
          }
          else {
            $('#final_url').val('Please fill all require field');
            $('#create').attr('disabled', 'disabled');
          }
          return;
        }
        // Change behaviors
        $('#school_list').bind('change', function (e) {
          update_url();
          // get recent transcations
          var entity_id = $(this).val();
          if (entity_id != '') {
    //         $.getJSON('http://api.getsum.net/read/transactions?entity_source=mightynest&key=SSBMSUtFIFNFWCE&ti=1-100&entity_type=user&entity_id=' + entity_id, function (data) {
    //           $('#transcations').val(JSON.stringify(data, null, '\t')).show();
    //         });
            $('#transcations-table').dataTable({
              "bProcessing": true,
              "sAjaxSource": 'http://api.getsum.net/transactions/entity_id.json?entity_source=mightynest&key=' + api_key + '&ti=1-100&entity_type=user&entity_id=' + entity_id,
              "sAjaxDataProp": '',
              //"sAjaxDataProp": 'trans_index_list',
              "bDestroy": true,
              "aaSorting": [[0, "desc"]],
              "iDisplayLength": 25,
              "bAutoWidth": false,
              "aoColumns": [
                { "mData": "tid" },
                { "mData": "ei" },
                { "mData": "s" },
                { "mData": "st" },
                { "mData": "si"},
                { "mData": "value_string" },
                {
                  "mData": "ts",
                  "mRender": function (data, type, full) {
                    if (type == 'display') {
                      var _date = new Date(data * 1000);
                      return $.datepicker.formatDate('mm/dd/yy', _date);
                    }
                    return data;
                  }
                }
              ]
            }).show();
            // Also get summary report
            $.getJSON('http://api.getsum.net/read/sums?es=mightynest&k=' + api_key + '&et=user&ei=' + entity_id, function (data) {
              var string = [];
              $('#summary').html('<ul></ul>').show();
              for(var value_tag in data.transaction_totals) {
                var list_item = value_tag + ': (' + data.transaction_totals[value_tag] + ') ' + data.sums[value_tag];
                $('#summary ul').append($(document.createElement('li')).text(list_item));
                string.push();
              }
              //$('#summary').html(string.join(', ')).show();
            });
          }
          else {
            $('#transcations,#summary').hide();
          }
        });
        $('#value_tag').bind('change', function (e) {
          update_url();
        });
        $('#value').bind('keyup', function (e) {
          update_url();
        });
        // final_url click, select all text inside
        $('#final_url').click(function () {
          $(this).select();
        });
        // Create button create
        $('#create').click(function (e) {
          e.preventDefault();
          $.getJSON($('#final_url').val(), function (data) {
            $('#debug').val(JSON.stringify(data, null, '\t')).show();
            // trigger school_list change
            $('#school_list').trigger('change');
          });
        });

      },
      dataType: 'json'
    });
  });
})(jQuery);
