import React from 'react';
import ReactDOM from 'react-dom';
import App from './TodoItem';

it('renders list of tasks', () => {
  const ul = document.createElement('ul');
  ReactDOM.render(<App />, ul);
});