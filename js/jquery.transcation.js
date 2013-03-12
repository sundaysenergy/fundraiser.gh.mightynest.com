(function ($) {
  $(function() {
    var $school_list = $('#school_list');
    $.getJSON('http://mightynest.getsum.net/proxy/affiliate/list/json', function (data) {
      $.each(data, function (index, item) {
        var $option = $('<option />').attr('value', index).html(item);
        $school_list.append($option);
      });
    });
  });
})(jQuery);