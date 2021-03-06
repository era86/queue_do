(function( $ ){

  $.fn.temple = function() {

    return this.each(function() {
      var $this = $(this);
      $this.parent().children("[class!=temple]").remove();

      var dataStr = $this.attr("data");

      var scopes = dataStr.split(".");

      var currScope = window;
      for (var i = 0; i < scopes.length; i++) {
        currScope = currScope[scopes[i]];
      }
      
      if (!(currScope instanceof Array)) {
        throw "Undefined data object: "+dataStr;
      }

      var html = $this.html();
      $.each(currScope, function(i, v) {
        var transHtml = html;

        for (k in v) {
          var regex = new RegExp("{{"+k+"}}", "ig");
          transHtml = transHtml.replace(regex, v[k]);
        }

        $this.parent().append(transHtml);
      });
    });

  };

})( jQuery );

$(function(){
  $(".temple").temple();
});


