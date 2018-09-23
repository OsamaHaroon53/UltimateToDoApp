import React, { Component } from 'react';
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
      update: false,
    }
  }


  componentDidMount() {
    const database = firebase.database();
    database.ref('todos').on("value", (snap) => {
      if (!snap.val()) {
        this.setState({
          fetched: true,
        })
        return;
      }

      this.setState({
        data: snap.val(),
        fetched: true,
        title:"",
        description:""

      })
    })
  }

  //  Managing text and description instate //

  entries(ev) {
    var data = {};
    data[ev.target.name] = ev.target.value;
    this.setState(data)
  }

  // done


  // DeleteTodo //
  deleteTodo(id) {
    const { data } = this.state;
    const database = firebase.database();
    database.ref(`todos/${id}`).set({}).then(() => {
      swal({
        icon: "success",
        title: "deleted"
      })
    }).catch(() => {
      swal({
        title: 'SomeThing Went Wrong',
        text: "May Be A Network Error",
        icon: "error"
      })
    })
  }

  //done

  // Managing State For Update //

  editTodo(id) {
    const { data } = this.state;
    this.setState({
      title: data[id].title,
      description: data[id].description,
      update: true,
      updateObj: data[id]
    })
  }

  // Updation Here //

  update() {
    const { updateObj, title, description } = this.state;
    const database = firebase.database();
    database.ref(`todos/${updateObj._id}`).set({
      title,
      description,
      _id: updateObj._id,
      done: updateObj.done
    }).then(() => {
      swal({
        icon: "success",
        title: "Updated"
      })
      this.setState({
        update: false,
        updateObj: null,
      })
    }).catch(() => {
      swal({
        title: 'SomeThing Went Wrong',
        text: "May Be A Network Error",
        icon: "error"
      })
    })

  }

  // done 

  // done or un-done //

  done(id) {
    const { data } = this.state;
    const database = firebase.database();
    database.ref(`todos/${id}`).set({
      title: data[id].title,
      description: data[id].description,
      _id: data[id]._id,
      done: data[id].done ? false : true
    }).then(() => {
      if (data[id].done) {
        document.querySelector(`#${id}`).checked
        return
      }
      document.querySelector(`#${id}`).removeAttribute("checked")
    })


  }

  // done

  // Some Validation For Adding New Todo //

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

  // Adding New Todo //   

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
    }).catch(() => {
      swal({
        title: 'SomeThing Went Wrong',
        text: "May Be A Network Error",
        icon: "error"
      })
    })
  }


  //JSX Render
  //Todos Rendering With Checking Of Done Undone

  renderTodo() {
    var { data } = this.state;
    var remaining = 0;
    var completed = 0;
    var todos = [];
    for (var i in data) {
      if (!data[i].done) {
        remaining++;
        todos.unshift(
          <li className="todo" id={data[i]._id + "li"} key={data[i]._id}>
            <input type="checkbox" className="checkBox" onChange={this.done.bind(this, data[i]._id)} name="" id={data[i]._id} />
            <span>{data[i].title}</span>
            <span className="btnGrp">
              <button className="btn" onClick={this.editTodo.bind(this, data[i]._id)}>Edit</button>
              <button className="btn" onClick={this.deleteTodo.bind(this, data[i]._id)}>Delete</button>
            </span>
            <span className="des">{data[i].description}</span>
          </li>
        )
      } else {
        completed++;
        todos.push(
          <li className="todo" id={data[i]._id + "li"} key={data[i]._id}>
            <input type="checkbox" checked onChange={this.done.bind(this, data[i]._id)} selected="selected" className="checkBox" name="" id={data[i]._id} />
            <del>{data[i].title}</del>
            <span className="btnGrp">
              <button className="btn" onClick={this.deleteTodo.bind(this, data[i]._id)}>Delete</button>
            </span>
            <del className="des">{data[i].description}</del>
          </li>
        )
      }

    }

    return ({ todos, remaining, completed });

  }


  // Official Render Method //

  render() {
    const { data, title, description, fetched, update } = this.state;
    var operator = update ? "Update" : "Add"
    var frmEv = update ? () => this.update() : () => this.addTodo()
    var list = fetched && data && this.renderTodo();
    return (
      <div className="container">
        <h1>TodoApp</h1><hr />

        <input type="text" name="title" placeholder="Enter The Title Here"
          id="title" className="txtBox field"
          value={title} onChange={(ev) => this.entries(ev)} />

        <input type="text" name="description" placeholder="Enter The Description Here"
          id="description" className="txtBox field"
          value={description} onChange={(ev) => this.entries(ev)} />

        <input type="button" className="field" value={operator} onClick={frmEv} /><hr />

        <ul className="todos">
          {!fetched && "Loading...."}
          {fetched && !data && "No Task Yet"}
          {list && list.todos}
          {fetched && data && <p>Task Remaining : {list && list.remaining} | Finished : {list && list.completed} </p>}
        </ul>
      </div>
    );
  }
}

export default App;
