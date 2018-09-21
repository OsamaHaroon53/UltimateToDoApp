import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todolist;

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

}
