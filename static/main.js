var React = require('react');
var ListPanel = require('./js/components/ListPanel.react').ListPanel;
var reloadLists = require('./js/stores/ListStore').reloadLists;

React.render(<ListPanel url='/api/lists/' />, document.getElementById('content'));

reloadLists();
