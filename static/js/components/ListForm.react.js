var React = require('react');
var ListActions = require('../actions/ListActions').ListActions;

var ListForm = React.createClass({

  getInitialState: function() {
    if (this.props.list) {
      return this.props.list;
    } else {
      return {
        cards:[]
      };
    }
  },
  componentWillReceiveProps: function(props) {
    if (props.list) {
      this.setState(props.list);
    } else {
      this.replaceState({
        cards:[]
      });
    }
  },
  render: function() {
    self = this;
    return(
      <div className="form">
      <h1>Editor</h1>
      <hr />
      <form onSubmit={this.onSubmit}>
      <label forHtml='name'>List Name</label><br />
      <input ref='name' name='name' type='text' value={this.state.name} onChange={this.onFormChange} />
      <div id="dynamicCardInput">

      <label forHtml='Cards'>Cards</label><br />
      {
        this.state.cards.map(function(result,index) {
          var arrow = (index===0) ? 	"\u0020" : "\u25B2" ;

          return <div key={index} >
                  <a onClick={self.reorder_item.bind(null, index)}>{arrow}</a>
                  <input ref={index} name={index} type="text" value={result} onChange={self.onCardChange} />
                  <button onClick={self.remove_item.bind(null, index)}>X</button>
                  <br />
                </div>;
        })
      }
        <button onClick={this.add_more}>Add Cards</button>
      </div>
      <br />
      <hr />
      <input type='submit' value={(this.state.id)?"Save (id = " +this.state.id+ ")":"Save List"} />
      {this.state.id?<button onClick={this.onDeleteClick}>Delete</button>:""}
      {this.state.id?<button onClick={this.onCancelClick}>Cancel</button>:""}
      {this.props.message?<div>{this.props.message}</div>:""}
      </form>
</div>



    );
  },
  onCardChange: function(i,e) {
   var cards = this.state.cards;
    cards[parseInt(i.target.name)] = i.target.value; // Update it with the modified email.
    this.setState({cards: cards}); // Update the state.
  },
  onFormChange: function() {
    this.setState({
      name: React.findDOMNode(this.refs.name).value,
    })
  },
  add_more: function(e) {
    e.preventDefault();
   var cards=this.state.cards;
   cards.push('');
   this.setState({ cards: cards })
  },
  remove_item: function(i,e) {
    e.preventDefault();
   var cards=this.state.cards;
   cards.splice(i, 1);
   this.setState({ cards: cards })
 },
 reorder_item: function(i,e) {
     e.preventDefault();
     console.log("asd")
     if (i>0){
       var cards=this.state.cards;
       var temp = cards[i-1];
       cards[i-1] = cards[i];
       cards[i] = temp;
       this.setState({ cards: cards })
     }

  /*  var cards=this.state.cards;
    cards.splice(i, 1);
    this.setState({ cards: cards })*/
  },
  onSubmit: function(e) {
    e.preventDefault();
    ListActions.save(this.state)
  },
  onCancelClick: function(e) {
    e.preventDefault();
    ListActions.edit_cancel()
  },
  onDeleteClick: function(e) {
    e.preventDefault();
    ListActions.delete(this.state.id)
  }
});

module.exports.ListForm = ListForm;
