import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoList />, div);
  ReactDOM.unmountComponentAtNode(div);
});



// it('renders a todo heading', () => {
//     const h1 = document.createElement('h1');
//     ReactDOM.render(<TodoList />, h1);
//     ReactDOM.unmountComponentAtNode(h1);
//   });
  