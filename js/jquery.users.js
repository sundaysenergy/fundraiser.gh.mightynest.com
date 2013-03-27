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


        // Function update url
        function update_url() {
          var value = $('#value').val();

          if (value != '') {

            var final_url = 'http://api.getsum.net/transactions/source_id.json?es=mightynest&k=' + api_key + '&ti=1-100&et=user&si=' + value + '&st=email&s=' + $('#source').val();
            $('#final_url').val(final_url);
            $('#create').removeAttr('disabled');
          }
          else {
            $('#final_url').val('Please fill all require field');
            $('#create').attr('disabled', 'disabled');
          }
          return;
        }


        function get_result() {
            // get recent transcations
            var entity_id = $('#value').val();
            if (entity_id != '') {
                //         $.getJSON('http://api.getsum.net/read/transactions?entity_source=mightynest&key=SSBMSUtFIFNFWCE&ti=1-100&entity_type=user&entity_id=' + entity_id, function (data) {
                //           $('#transcations').val(JSON.stringify(data, null, '\t')).show();
                //         });
                $('#transcations-table').dataTable({
                    "bProcessing": true,
                    "sAjaxSource": 'http://api.getsum.net/transactions/source_id.json?es=mightynest&k=' + api_key + '&ti=1-100&et=user&si=' + entity_id + '&st=email&s=' + $('#source').val(),
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
                        { "mData": "ts" }
                    ]
                }).show();
            }
            else {
                $('#transcations-table').hide();
            }
        }
        $('#source').bind('change', function () {
            update_url();
        });
        // Change behaviors
        $('#value').bind('keyup', function () {
          update_url();
        });
        // final_url click, select all text inside
        $('#final_url').click(function () {
          $(this).select();
        });
        // Create button create
        $('#create').click(function (e) {
          e.preventDefault();
          get_result();
//          $.getJSON($('#final_url').val(), function (data) {
//            $('#debug').val(JSON.stringify(data, null, '\t')).show();
//          });
        });

       },
       dataType: 'json'
    });
  });
})(jQuery);
