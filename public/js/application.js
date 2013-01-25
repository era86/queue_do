var QueueDo = QueueDo || {};

QueueDo.items = ItemData.getItems();

$(function(){
  $(".queue").sortable({
    connectWith: ".queue"
  });

  $(".queue, .item").disableSelection();
});

$(function(){
  $("[type=temple]").temple();
});
