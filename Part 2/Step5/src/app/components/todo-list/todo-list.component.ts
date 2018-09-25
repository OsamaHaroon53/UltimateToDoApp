import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todolist: any;

  constructor(private list: TodoService) { }

  ngOnInit() {
    this.list.getList()
      .subscribe(res => {
        this.todolist = res;
      })
  }

  onDelete(id, i) {
    console.log(id);
    this.list.delList(id)
      .subscribe(res => {
        this.todolist.splice(i, 1);
      });

  }

  onUpdate(todo, i) {
    // console.log(todo);
    let title = window.prompt("Enter New title", this.todolist[i].title);
    let description = window.prompt("Enter New description", this.todolist[i].description);
    let isDone = window.prompt("Enter Status", this.todolist[i].done);
    let done = Boolean(isDone);
    // console.log(title,description,done)
    this.list.updateList({ title: title, description: description, done: done }, todo.id)
      .subscribe(res => {
        this.todolist[i].title = title;
        this.todolist[i].description = description;
        this.todolist[i].done = done;
      })
  }
}
