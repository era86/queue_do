$(function(){

  $("body").on("click", ".item-cancel-button", function(){
    $(this).parent().dialog("close");
  });

  $("body").on("click", ".item-create-button", function(){
    var $f = $(this).parent();

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
