$(function(){

  $("body").on("click", ".item-cancel-button", function(){
    $(this).closest(".add-item-form").dialog("close");
  });

  $("body").on("click", ".item-create-button", function(){
    var $f = $(this).closest(".add-item-form");

    var queueId = $f.attr("value");

    var attrs = {
      queue_id: queueId
    };

    $("input, textarea", $f).each( function(i, v) {
      var name = $(v).attr("name");
      var value = $(v).val();
      attrs[name] = value;
    });

    ItemData.createItem(attrs);
    QueueDo.loadQueueData();
    $(".temple").temple();
    $f.dialog("close");
  });

});


$(function(){
  var limit = 80;
  $(".add-item-form textarea").keyup(function(){
    var curVal = $(this).val();
    if (curVal.length >= limit) {
      $(this).val(curVal.substr(0, limit));
    }
  });
});
