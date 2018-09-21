import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";
  var config = {
    apiKey: "AIzaSyDt0Z_ldFeIS6nBPZ23HZfsC1YgjqOmh84",
    authDomain: "react-todo-app-17899.firebaseapp.com",
    databaseURL: "https://react-todo-app-17899.firebaseio.com",
    projectId: "react-todo-app-17899",
    storageBucket: "react-todo-app-17899.appspot.com",
    messagingSenderId: "671605862627"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
