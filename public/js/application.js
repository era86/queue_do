var QueueDo = QueueDo || {};

QueueDo.loadQueueData = function() {
  $.each(["to_do", "in_progress", "complete", "incomplete"], function(i, v) {
    QueueDo[v] = ItemData.getItemsWithQueueId(v); 
  });
}
QueueDo.loadQueueData();

function itemMoveEvent(e, ui) {
  var $li = $(ui.item);
  var newQueueId = $li.parent().attr("value");
  var id = $li.attr("value");
  
  ItemData.updateItem(parseInt(id), {queue_id: newQueueId});
}

$(function(){
  $(".queue").sortable({
    connectWith: ".queue",
    receive: itemMoveEvent
  });

  $(".queue, .item").disableSelection();
});

$(function(){
  $(".create-item-button")
  .click( function() {
    var queueId = $(this).attr("value");

    $(".add-item-form[value="+queueId+"]").dialog("open");
  });

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
  $("body").on("click", ".delete-item-button", function() {
    var itemId = $(this).attr("value");
    ItemData.deleteItem(itemId);
    QueueDo.loadQueueData();
    $(".temple").temple();
  });
});

