var React = require('react');
var Firebase = require('firebase');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase("https://homeservernettodo.firebaseio.com/items/" + this.props.item.key);
  },
  render: function() {
    return <div className="input-group">
      <span className="input-group-addon">
        <input
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleDoneChange}
        />
      </span>
      <input
        type="text"
        disabled={this.state.done}
        className="form-control"
        onChange={this.handleTextChange}
        value={this.state.text}
      />
      <span className="input-group-btn">
        {this.changesButtons()}
        <button
          className="btn btn-default"
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      </span>
    </div>
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null;
    }
    return [
      <button
        className="btn btn-default"
        onClick={this.handleSaveClick}
      >
        Save
      </button>,
      <button
        className="btn btn-default"
        onClick={this.handleUndoClick}
      >
        Undo
      </button>
    ]
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: true
    });
  },
  handleSaveClick: function(event) {
    this.fb.update({text: this.state.text});
    this.setState({
      text: this.state.text,
      textChanged: false
    });
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  },
  handleDoneChange: function(event) {
    this.setState({done: event.target.checked});
    this.fb.update({done: event.target.checked});
  },
  handleDeleteClick: function() {
    this.fb.remove();
  }
});
