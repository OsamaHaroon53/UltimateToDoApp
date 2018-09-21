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

  onDelete(id) {
    console.log(id);
    this.list.delList(id)
      .subscribe(res => {
        if (res) {
          this.todolist = this.list.getList()
            .subscribe(res => {
              this.todolist = res;
              location.reload();
            });
        }
      })
  }

  onUpdate(todo) {
    // console.log(todo);
    let title = window.prompt("Enter New title", "Sample");
    let description = window.prompt("Enter New description", "Sample");
    let isDone = window.prompt("Enter Status", "");
    let done = Boolean(isDone);
    // console.log(title,description,done)
    this.list.updateList({ title: title, description: description, done: done }, todo.id)
      .subscribe(res => console.log(res))
  }
}
