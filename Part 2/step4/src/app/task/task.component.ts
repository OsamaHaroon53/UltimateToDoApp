import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) { }
  todo = new todo("", "", false);
  todolist = [];
  modalTodo: object = new todo("", "", false);
  valid: boolean;
  msg: string;
  title; description; done;
  ngOnInit() {
    this.valid = false;
    this.taskService.getData('tasks').subscribe(data => {
      this.todolist = data.data;
    });
  }

  onSubmit() {
    this.taskService.addData('tasks', this.todo).subscribe(data => {
      this.todolist.push(data.data);
    }, error => {
      this.valid = true;
      this.msg = error;
    });
  }

  onDelete(_id, id) {
    console.log(id);
    this.taskService.deleteData('tasks/' + _id).subscribe(res => {
      this.todolist.splice(id, 1);
    }, error => {
      this.valid = true;
      this.msg = error;
    });
  }
  onUpdateCall(index) {
    this.modalTodo = this.todolist[index];
    this.title = this.todolist[index].title;
    this.description = this.todolist[index].description;
    this.done = this.todolist[index].done;
  }
  checkUpdate(): boolean {
    if (
      this.title !== this.modalTodo['title'] ||
      this.modalTodo['description'] !== this.description ||
      this.modalTodo['done'] !== this.done) {
      return true;
    }
    return false;
  }
  onUpdate(id) {
    this.taskService.editData('tasks/' + id, this.modalTodo).subscribe();
  }
}
class todo {
  constructor(
    title: String,
    description: String,
    done: Boolean
  ) { }
}
