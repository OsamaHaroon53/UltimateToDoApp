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

    it('should render all description of tasks', () => {
        let de = fixture.debugElement.query(By.css('.dropdown-menu'));
        expect(de.nativeElement.innerText).toContain('world');
    });
    it('should render all title of tasks', () => {
        let de = fixture.debugElement.query(By.css('.dropdown-toggle'));
        expect(de.nativeElement.innerText).toContain('hello');
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
