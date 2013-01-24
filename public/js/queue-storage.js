var QueueStorage = function() {

  function loadData(table) {
    if (!localStorage[table]) {
      localStorage[table] = JSON.stringify([]);
    }

    return JSON.parse(localStorage[table]);
  }

  function storeData(table, data) {
    localStorage[table] = JSON.stringify(data);
  }

  function getNextSeqId(table) {
    var data = loadData(table);

    if (data.length === 0) {
      return 0;
    }

    var ids = $.map(data, function(v, i) { return v["id"]; }).sort();
    var max_id = ids[ids.length - 1];

    return max_id + 1;
  }
 
  return {
    createItem: function(attrs) {
      var table = "items";

      // TODO: Verify attrs

      var data = loadData(table);

      var newItem = $.extend({}, attrs, { id: getNextSeqId(table) });
      data.push(newItem);

      storeData(table, data);

      return newItem;
    },

    updateItem: function(itemId, attrs) {
    },

    deleteItem: function(itemId) {
    },

    getItems: function() {
    }
  }

}();

// Item
//    id
//    queue_id
//    name
//    description
//    created_at
//    deadline
