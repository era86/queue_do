$(function(){
  $(".add-item-form").dialog({
    autoOpen: false,
    position: { 
      my: "center", 
      at: "center", 
      of: $(".content")
    },
    draggable: false
  });
});

$(function(){

  $("body").on("click", ".item-cancel-button", function(){
    $(this).closest(".add-item-form").dialog("close");
  });

  $("body").on("click", ".item-create-button", function(){
    var $f = $(this).closest(".add-item-form");
    var now = new Date();
    var limit = $("select", $f).val();

    var attrs = {
      queue_id: "to_do",
      created_at: now,
      deadline: new Date(now.getTime() + parseInt(limit))
    };

    $("input, textarea", $f).each( function(i, v) {
      var name = $(v).attr("name");
      var value = $(v).val();
      attrs[name] = value;
    });

    var itemId = $("input[name='itemId']", $f).val();
    if (itemId === "") {
      ItemData.createItem(attrs);
    } else {
      ItemData.updateItem(itemId, attrs);
    }

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
