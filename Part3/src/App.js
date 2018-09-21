import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data:null
    }
  }
  componentDidMount(){
    // const database = firebase.database();
    // database.ref("basic")
  }
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}

export default App;
