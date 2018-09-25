import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TaskComponent],
            imports: [
                FormsModule,
                HttpModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        component.todolist = [{ _id: '123jakdkkdkdd', title: "hello", description: "world", done: false }]
        fixture.detectChanges();
    });

    it('should render all todos', () => {
    let de = fixture.debugElement.queryAll(By.css('td'));
    expect(de[0].nativeElement.innerHTML).toBe('123jakdkkdkdd');
    expect(de[1].nativeElement.innerHTML).toBe('hello');
    expect(de[2].nativeElement.innerHTML).toBe('world');
    expect(de[3].nativeElement.innerHTML).toBe('false');
  });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
