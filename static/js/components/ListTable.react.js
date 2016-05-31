var React = require('react');
var ListTableRow = require('./ListTableRow.react').ListTableRow;

var ListTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.lists.forEach(function(list) {
            rows.push(<ListTableRow key={list.id} list={list} />);
        });
        return (
          <div>
              {rows}
          </div>
        );
    }
});

module.exports.ListTable = ListTable ;
