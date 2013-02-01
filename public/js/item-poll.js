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

    $(e).attr("style", "background-color: #FFFFFF;");
    if (perc <= 50 && perc > 20) {
      $(e).attr("style", "background-color: #FFFFCC;");
    } else if (perc <= 20 && perc > 1) {
      $(e).attr("style", "background-color: #FFCC66;");
    } else if (perc <= 1) {
      $(e).attr("style", "background-color: #CC0000;");
    }

    if (item.queue_id === "complete") {
      $(e).attr("style", "background-color: #99FF99;");
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
