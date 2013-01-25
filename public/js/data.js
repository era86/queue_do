var Data = function() {

  function loadData(table) {
    if (!localStorage[table]) {
      localStorage[table] = JSON.stringify([]);
    }

    return JSON.parse(localStorage[table]);
  }

  return {
    loadData: loadData,

    storeData: function(table, data) {
      localStorage[table] = JSON.stringify(data);
    },

    getNextSeqId: function(table) {
      var data = loadData(table);

      if (data.length === 0) {
        return 0;
      }

      var ids = $.map(data, function(v, i) { 
        return v["id"]; 
      }).sort();

      var max_id = ids[ids.length - 1];

      return max_id + 1;
    }
  }
}();

