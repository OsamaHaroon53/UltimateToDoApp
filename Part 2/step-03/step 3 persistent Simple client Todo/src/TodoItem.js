import React, { Component} from 'react';
import './App.css';
// import './src/App.css';

class TodoItem extends Component {
  constructor( props){
    super();
  }
  completeCheck = (event) => {
    event.preventDefault();
    this.props.completeCheck( this.props.item);
  };
  
  render(){
    return (
      
      <ul className="theList" ><input type="checkbox" onChange={this.completeCheck}/>{this.props.item.text}</ul>
    );
  }
}

export default TodoItem;
