var QueueDo = QueueDo || {};

QueueDo.pollInterval = 100;

QueueDo.startItemPoll = function() {
  $(".item").each(function(i, e) {
    var itemId = $(e).val();
    var item = ItemData.getItem(itemId);

    var now = new Date();
    var deadline = new Date(item.deadline);
    var limit = parseInt(item.limit);
    var timeLeft = deadline.getTime() - now.getTime();

    var perc = (timeLeft/limit)*100;

    $(["warm", "hot", "complete", "incomplete"]).each(function(i, v) {
      $(e).removeClass(v);
    });

    if (perc <= 50 && perc > 20) {
      $(e).addClass("warm");
    } else if (perc <= 20 && perc > 1) {
      $(e).addClass("hot");
    } else if (perc <= 1) {
      $(e).addClass("incomplete");
    }

    if (item.queue_id === "complete") {
      $(e).addClass("complete");
    }
  });
}

QueueDo.itemPollId = setInterval(QueueDo.startItemPoll, QueueDo.pollInterval);

$(function() {
  $("body").on("mousedown", ".item", function() {
    clearInterval(QueueDo.itemPollId);
  });

  $("body").on("mouseup", ".item", function() {
    QueueDo.itemPollId = setInterval(QueueDo.startItemPoll, QueueDo.pollInterval);
  });
});
