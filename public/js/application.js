var QueueDo = QueueDo || {};

QueueDo.getDateStr = function(date) {
  return date.toDateString().substring(4,100) + " " + date.toTimeString().substring(0,8);
}

QueueDo.loadQueueData = function() {
  $(["to_do", "in_progress", "complete", "incomplete"]).each(function(i, v) {
    var items = ItemData.getItemsWithQueueId(v); 
    QueueDo[v] = [];

    $(items).each(function(i, e) {
      var deadline = new Date(e.deadline);
      e.deadlineStr = QueueDo.getDateStr(deadline);
      QueueDo[v].push(e);
    });
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
  setInterval(function() {
    $(".time-cont").html(QueueDo.getDateStr(new Date()));
  }, 500);
});
