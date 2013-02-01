$(function(){
  $(".create-item-button")
  .click( function() {
    var $f = $(".add-item-form");
    $("input, textarea", $f).val("");
    $("select", $f).removeAttr("disabled");
    $f.dialog("open");
  });
});

$(function(){
  $("body").on("click", ".delete-item-button", function() {
    var itemId = $(this).attr("value");
    ItemData.deleteItem(itemId);
    QueueDo.loadQueueData();
    $(".temple").temple();
  });
});

$(function(){
  $("body").on("click", ".edit-item-button", function() {
    var $f = $(".add-item-form");
    var itemId = $(this).attr("value");
    var attrs = ItemData.getItem(itemId);

    $("input, textarea", $f).each(function(i, e){
      var value = attrs[$(e).attr("name")];
      $(e).val(value);
    });

    $("input[name='itemId']", $f).val(itemId);

    var createdAt = new Date(attrs["created_at"]);
    var deadline = new Date(attrs["deadline"]);
    var limit = deadline.getTime() - createdAt.getTime();

    $("select", $f).val(limit).attr("disabled", "disabled");

    $f.dialog("open");
  });
});

