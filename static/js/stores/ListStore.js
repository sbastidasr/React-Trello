var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../actions/ListActions').AppDispatcher;
var ListConstants = require('../constants/ListConstants')

var _state = {
  lists: [],
  message:"",
  editingList: null
}

var _props = {
  url: '/api/lists/'
}

var _reloadLists = function() {
  $.ajax({
    url: _props.url,
    dataType: 'json',
    cache: false,
    success: function(data) {
      var arr = _.sortBy(data.rows, 'pos');
      _state.lists = _.without(arr, _.findWhere(arr, {id: 0}));
      ListStore.emitChange();
    },
    error: function(xhr, status, err) {
      console.error(_props.url, status, err.toString());
      _state.message = err.toString();
      ListStore.emitChange();
    }
  });
};

var _deleteList = function(listId) {
  $.ajax({
    url: _props.url+listId,
    method: 'DELETE',
    cache: false,
    success: function(data) {
      _state.message = "Successfully deleted list!"
      _clearEditingList();
      _reloadLists();
    },
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
      _state.message = err.toString();
      ListStore.emitChange();
    }
  });
};


var _saveList = function(list) {
  if(list.id) {//if update
    $.ajax({
      url: _props.url+list.id,
      dataType: 'json',
      method: 'POST',
      data:list,
      cache: false,
      success: function(data) {
        _state.message = "Successfully updated list!"
        _clearEditingList();
        _reloadLists();
      },
      error: function(xhr, status, err) {
        console.log("fails")
        _state.message = err.toString()
        ListStore.emitChange();
      }
    });

  } else {//if new

    list.pos=nextFreePos();
    if (list.cards.length<1){
      list.cards=[" "];
    }

    $.ajax({
      url: _props.url,
      dataType: 'json',
      method: 'POST',
      data:list,
      cache: false,
      success: function(data) {
        _state.message = "Successfully added list!"
        _clearEditingList();
        _reloadLists();
      },
      error: function(xhr, status, err) {
        console.log("fails"+_props.url)

        _state.message = err.toString()
        ListStore.emitChange();
      }
    });
  }
};
var nextFreePos = function() {
  var arr=_state.lists;
  var next=0;
  for(var i=0;i<arr.length;i++)
  {
    if(arr[i].pos > next){
      return next;
    }
    next++;
  }
  return next;
}


var _clearEditingList = function() {
  _state.editingList = null;
};

var _editList = function(list) {
  _state.editingList = list;
  ListStore.emitChange();
};
var _switchWithNext = function(list){
  var currentIndex = _.indexOf(_state.lists, list);
  nextList= _state.lists[currentIndex+1];
  if(nextList!== undefined){
    var currentPos = list.pos;
    list.pos=nextList.pos;
    nextList.pos=currentPos;
    _saveList(list);
    _saveList(nextList);
  }
}
var _cancelEditList = function() {
  _clearEditingList();
  ListStore.emitChange();
};


var ListStore = $.extend({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});


AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case ListConstants.LIST_EDIT:
    _editList(action.list);
    break;
    case ListConstants.LIST_REORDER:
    _switchWithNext(action.list);
    break;
    case ListConstants.LIST_EDIT_CANCEL:
    _cancelEditList();
    break;
    case ListConstants.LIST_SAVE:
    _saveList(action.list);
    break;
    case ListConstants.LIST_DELETE:
    _deleteList(action.listId);
    break;
  }
  return true;
});


module.exports.ListStore = ListStore;
module.exports.reloadLists = _reloadLists;
