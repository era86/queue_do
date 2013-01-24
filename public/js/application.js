$(function(){
  $(".queue").sortable({
    connectWith: ".queue"
  });

  $(".queue, .item").disableSelection();
});
