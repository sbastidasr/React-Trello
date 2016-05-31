var React = require('react');
var ListStore = require('../stores/ListStore').ListStore;
var ListActions = require('../actions/ListActions').ListActions;
var ListTable = require('./ListTable.react').ListTable;
var ListForm = require('./ListForm.react').ListForm;

var ListPanel = React.createClass({
  getInitialState: function() {
    return ListStore.getState(); //gets all lists
  },
  render: function() {
    return(
      <div className="asd">
      <div className="row">
      <div className="col-md-8">
      <div className="row">
      <ListTable lists={this.state.lists} />
      </div>
      </div>
      <div className="col-md-4">

      <ListForm
      list={this.state.editingList}
      message={this.state.message}
      />

      </div>
      </div>
      <br />
      </div>
    );
  },
  _onChange: function() {
    this.setState( ListStore.getState() );
  },
  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },
  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  }
});

module.exports.ListPanel = ListPanel;
