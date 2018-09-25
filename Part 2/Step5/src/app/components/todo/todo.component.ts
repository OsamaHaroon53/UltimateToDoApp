import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private list: TodoService) {
    this.todoForm = fb.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'done': [false, Validators.required]
    });
  }

  onSubmit(form) {
    console.log(form);
    this.list.adList(form).subscribe(res => {
      if (res) {
        window.location.reload();
      }
    });

  }
  ngOnInit() {
  }

}
