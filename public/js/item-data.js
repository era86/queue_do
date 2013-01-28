// Item
//    id
//    queue_id
//    name
//    description
//    created_at
//    deadline

var ItemData = function() {
  var table = "items";
  var columns = [
    "queue_id",
    "name",
    "description",
    "created_at",
    "deadline"
  ];

  function isValidAttributes(attrs) {
    var valid = true;

    $.each(attrs, function(k, v) {
      if (-1 === $.inArray(k, columns)) {
        console.log("Faulty attribute: "+k);
        valid = false;
        return false;
      }
    });

    return valid;
  }

  return {
    createItem: function(attrs) {
      if (!isValidAttributes(attrs)) {
        throw "Invalid attributes" + JSON.stringify(attrs);
      }

      var data = Data.loadData(table);

      var newItem = $.extend({}, attrs, { id: Data.getNextSeqId(table) });
      data.push(newItem);

      Data.storeData(table, data);

      return $.extend({}, newItem);
    },

    updateItem: function(itemId, attrs) {
      if (!isValidAttributes(attrs)) {
        throw "Invalid attributes" + JSON.stringify(attrs);
      }

      var data = Data.loadData(table);

      var index = null;
      $.each(data, function(i,v) {
        if (v.id == itemId) {
          index = i;
          return false;
        }
      });

      var item = null;
      if (index != null) {
        item = $.extend(data[index], attrs);
        data[index] = item;
        Data.storeData(table, data);
      }

      return item;
    },

    deleteItem: function(itemId) {
      var data = Data.loadData(table);

      data = $.grep(data, function(e) {
        return itemId != e.id;
      });

      Data.storeData(table, data);
    },

    getItems: function() {
      return Data.loadData(table).slice();
    },

    getItemsWithQueueId: function(queueId) {
      return $.map(Data.loadData(table).slice(), function(e) {
        if (queueId == e.queue_id) { return e; }
      });
    }
  }

}();
