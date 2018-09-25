import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'To Do';
  constructor(private sw: SwUpdate) {
      sw.available.subscribe(ev => {
      sw.activateUpdate().then(() => document.location.reload())
    });
  }
    ngOnInit() {
      this.sw.available.subscribe((ev) => {
      window.location.reload();
    });
  }
}
