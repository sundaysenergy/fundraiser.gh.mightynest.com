(function ($) {
  $(function() {
    var $school_list = $('#school_list');
    // Get list school
    $.getJSON('http://mightynest.getsum.net/proxy/affiliate/list/json', function (data) {
      $.each(data, function (index, item) {
        var $option = $('<option />').attr('value', index).html(item);
        $school_list.append($option);
      });
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

        var final_url = 'http://api.getsum.net/create?api_key=SSBMSUtFIFNFWCE';
        $.each(data, function (i, item) {
          final_url += '&' + i + '=' + item;
        });
        $('#final_url').val(final_url);
      }
      return;
    }
    // Change behaviors
    $('#school_list').bind('change', function (e) {
      update_url();
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
  });
})(jQuery);