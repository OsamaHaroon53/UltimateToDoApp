import { Component, OnInit } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Ultimate To Do List';
  constructor(private updates: SwUpdate) {
    updates.available.subscribe(ev => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.updates.available.subscribe((ev) => {
      window.location.reload();
    });
  }
}
