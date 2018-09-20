import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = fb.group({
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'isComplete': [false, Validators.required]
    });
  }

  onSubmit(form) {
    console.log(form.value)

  }
  ngOnInit() {
  }

}
