import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase"
class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    const database = firebase.database();
    database.ref("basic").on("value", (snap) => {

      // this.setState({
      //   data: snap.val()
      // })
    })
  }
  renderTodo() {
    return (
      <li className="todo">
        <input type="checkbox" className="checkBox" name="" id="" />
        <span>TODO_1</span>
        <span className="btnGrp">
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </span>
        <span className="des">A Short Description </span>
      </li>
    )
  }



  render() {
    const { data } = this.state;
    // if (!data) { return "" };
    return (
      <div className="container">
        <h1>TodoApp</h1><hr />
        <input type="text" name="title" placeholder="Enter The Title Here" id="title" className="txtBox field" />
        <input type="text" name="description" id="description" placeholder="Enter The Description Here" className="txtBox field" />
        <input type="button" className="field" value="Add" /><hr />
        <ul className="todos">

        </ul>
      </div>
    );
  }
}

export default App;
