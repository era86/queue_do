var QueueDo = QueueDo || {};

$.each(["to_do", "in_progress", "complete", "incomplete"], function(i, v) {
  QueueDo[v] = ItemData.getItemsWithQueueId(v); 
});

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
  $(".temple").temple();
});

function createItem(queueId) {
  $("#add-item-form").dialog();
}

