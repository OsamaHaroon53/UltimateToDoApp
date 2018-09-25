import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


it('renders with heading', () => {
  const h3 = document.createElement('h3');
  ReactDOM.render(<App />, h3);
});


it('should have a button', () => {
  const button = document.createElement('button');
  ReactDOM.render(<App />, button);
});