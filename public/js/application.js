var QueueDo = QueueDo || {};

function loadQueueData() {
  $.each(["to_do", "in_progress", "complete", "incomplete"], function(i, v) {
    QueueDo[v] = ItemData.getItemsWithQueueId(v); 
  });
}
loadQueueData();

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
    height: 300,
    width: 300,
    modal: true,
    position: { 
      my: "center", 
      at: "center", 
      of: $(".content")
    },
    draggable: false,
    buttons: {
      Cancel: function() {
        $(this).dialog("close");
      },
      Create: function() {
        var queueId = $(this).attr("value");

        var attrs = {
          queue_id: queueId
        };

        $("input, textarea", $(this)).each( function(i, v) {
          var name = $(v).attr("name");
          var value = $(v).val();
          attrs[name] = value;
        });

        ItemData.createItem(attrs);
        loadQueueData();
        $(".temple").temple();
        $(this).dialog("close");
      }
    }
  });
});

$(function(){
  $("body").on("click", ".delete-item-button", function() {
    var itemId = $(this).attr("value");
    ItemData.deleteItem(itemId);
    loadQueueData();
    $(".temple").temple();
  });
});

