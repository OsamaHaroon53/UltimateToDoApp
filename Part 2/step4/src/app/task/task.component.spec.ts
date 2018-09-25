import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
