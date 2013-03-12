(function ($) {
  $(function() {
    console.log('a');
    $.getJSON('http://mightynest.getsum.net/proxy/affiliate/list/json', function (data) {
      console.log(data);
    });
  });
})(jQuery);