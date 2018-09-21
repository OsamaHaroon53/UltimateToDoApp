import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert'
import * as firebase from "firebase"
class App extends Component {

  constructor() {
    super();
    this.state = {
      data: null,
      fetched: false,
      title: "",
      description: "",
    }
  }


  componentDidMount() {
    const database = firebase.database();
    var { data } = this.state;
    database.ref('todos').on("value", (snap) => {
      if (!snap.val()) {
        this.setState({
          fetched: true,
        })
        return;
      }

      console.log(snap.val());

      this.setState({
        data: snap.val(),
        fetched: true,

      })
    })
  }


  renderTodo() {
    var { data } = this.state;
    var todos = [];
    for (var i in data) {
      todos.push(
        <li className="todo" id={data[i]._id + "li"} key={data[i]._id}>
          <input type="checkbox" className="checkBox" name="" id="" />
          <span>{data[i].title}</span>
          <span className="btnGrp">
            <button className="btn" onClick={() => this.editTodo(data[i]._id)}>Edit</button>
            <button className="btn" onClick={() => this.deleteTodo(data[i]._id)}>Delete</button>
          </span>
          <span className="des">{data[i].description}</span>
        </li>
      )
    }

    return todos;



  }

  entries(ev) {
    var data = {};
    data[ev.target.name] = ev.target.value;
    this.setState(data)

  }
  validate() {
    const { title, description } = this.state
    if (!title) {
      swal({
        title: "Please Fill The Title Box",
        icon: "error"
      })
      return;
    }
    else if (title.trim().length < 2) {
      swal({
        title: "Title Must Be Atlease Of 2 Charachters",
        icon: "error"
      })
      return;

    }
    if (!description) {
      swal({
        title: "Please Fill The Description Box",
        icon: "error"
      })
      return;
    }
    else if (description.trim().legth < 4) {
      swal({
        title: "Description Must Be Atlease Of 4 Charachters",
        icon: "error"
      })
      return;
    }
    return true;
  }


  addTodo() {
    var validate = this.validate();
    if (!validate) {
      return;
    }

    const { title, description } = this.state
    var database = firebase.database();

    swal({
      title: "Processing Data",
      icon: "info"
    })
    var todo = database.ref('todos').push();
    todo.set({
      _id: todo.key,
      title,
      description,
      done: false
    }).then(() => {
      swal({
        title: "SuccessFully",
        icon: "success"
      })
      this.setState({
        title: "",
        description: ""
      })
    }).catch(() => {
      swal({
        title: 'SomeThing Went Wrong',
        text: "May Be A Network Error",
        icon: "error"
      })
    })
  }


  render() {
    const { data, title, description, fetched } = this.state;

    return (
      <div className="container">
        <h1>TodoApp</h1><hr />

        <input type="text" name="title" placeholder="Enter The Title Here"
          id="title" className="txtBox field"
          value={title} onChange={(ev) => this.entries(ev)} />

        <input type="text" name="description" placeholder="Enter The Description Here"
          id="description" className="txtBox field"
          value={description} onChange={(ev) => this.entries(ev)} />

        <input type="button" className="field" value="Add" onClick={() => this.addTodo()} /><hr />

        <ul className="todos">
          {!fetched && "Loading...."}
          {fetched && !data && "No Task Yet"}
          {fetched && data && this.renderTodo()}
        </ul>
      </div>
    );
  }
}

export default App;
