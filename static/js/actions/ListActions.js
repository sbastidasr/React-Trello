var Dispatcher = require('flux').Dispatcher;
var ListConstants = require('../constants/ListConstants')
var AppDispatcher = new Dispatcher();


var ListActions = {
    search: function(query) {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_SEARCH,
            query: query
        });
    },
    save: function(list) {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_SAVE,
            list: list
        });
    },
    edit: function(list) {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_EDIT,
            list: list
        });
    },
    reorder: function(list) {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_REORDER,
            list: list
        });
    },
    edit_cancel: function() {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_EDIT_CANCEL
        });
    },
    delete: function(listId) {
        AppDispatcher.dispatch({
            actionType: ListConstants.LIST_DELETE,
            listId: listId
        });
    }
};


module.exports.ListActions = ListActions;
module.exports.AppDispatcher = AppDispatcher;
