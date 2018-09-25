import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: Http) { }

  base_url = "http://localhost:3000/todo/api/v1.0/";
  getData(url) {
    return this._http.get(`${this.base_url}${url}`).pipe(map(data => {
      console.log(data.json())
      return data.json();
    }));
  }
  addData(url, data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(`${this.base_url}${url}`, data, { headers: headers }).pipe(map(data => {
      console.log(data.json())
      return data.json();
    }));
  }

  editData(url, data) {
    return this._http.put(`${this.base_url}${url}`, data).pipe(map(data => {
      console.log(data.json())
      return data.json();
    }));
  }
  deleteData(url) {
    return this._http.delete(`${this.base_url}${url}`).pipe(map(data => {
      return data.json();
    }));
  }
}
