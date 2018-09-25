import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TodoListComponent],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todolist = [{ id: 1, title: "Book", description: "Science", done: false }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return id 1', () => {
    let de = fixture.debugElement.queryAll(By.css('td'));
    expect(de[0].nativeElement.innerHTML).toBe('1');
    expect(de[1].nativeElement.innerHTML).toBe('Book');
    expect(de[2].nativeElement.innerHTML).toBe('Science');
    expect(de[3].nativeElement.innerHTML).toBe('false');
  });
});
