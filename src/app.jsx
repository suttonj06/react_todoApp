var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');

var App = React.createClass({
  getInitialState: function() {
    return{
      items: {},
      loaded: false
    }
  },
  mixins: [ ReactFire ],
  handleDataLoaded: function() {
    this.setState({loaded: true});
  },
  componentWillMount: function() {
    this.fb = new Firebase([insert firebase url here]);
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return;
    }
    return <div className="text-center clear-complete">
      <button
        type="button"
        onClick={this.onDeleteDoneClick}
        className="btn btn-default"
      >
      Clear Complete
      </button>
    </div>
  },
  onDeleteDoneClick() {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
        <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
