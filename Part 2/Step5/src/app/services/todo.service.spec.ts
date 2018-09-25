import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, HttpClientModule, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
