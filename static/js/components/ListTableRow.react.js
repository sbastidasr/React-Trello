var React = require('react');
var ListActions = require('../actions/ListActions').ListActions;

var ListTableRow = React.createClass({
    render: function() {
      var cards = [];
      console.log(this.props.list);
      cards=this.props.list.cards.map(function(list, index) {
          return(<p key={index}>{list}</p>);
      });

        return (
            <div className="col-sm-4 card">
              <h6 className="inline">List id: {this.props.list.id}</h6>
                <a href='#' onClick={this.onOrder}><h5 className="inline left">&#9654;</h5></a>

              <h3>{this.props.list.name}</h3>
              <hr />
              <div className="elements">
                {cards}
              </div>
              <p><a href='#' onClick={this.onClick}>Edit</a></p>
            </div>
        );
    },
    onClick: function(e) {
        e.preventDefault();
        ListActions.edit(this.props.list);
    },
    onOrder: function(e) {
        e.preventDefault();
        ListActions.reorder(this.props.list);
    }
});

module.exports.ListTableRow = ListTableRow;
