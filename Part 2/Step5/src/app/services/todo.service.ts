import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get("http://localhost:3000/todo/api/v1.0/tasks");
  }

  adList(todo) {
    return this.http.post("http://localhost:3000/todo/api/v1.0/tasks", todo)
      .pipe(map(res => {
        if (res) {
          return true;
        }
        return false;
      }));
  }

  updateList(todo, id) {
    return this.http.put("http://localhost:3000/todo/api/v1.0/tasks/" + id, todo)
      .pipe(map(res => {
        if (res) {
          return true;
        }
        return false;
      }));
  }

  delList(id) {
    return this.http.delete("http://localhost:3000/todo/api/v1.0/tasks/" + id)
      .pipe(map(res => {
        if (res) {
          return true;
        }
        return false;
      }));
  }
}
