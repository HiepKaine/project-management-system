import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@frontend/env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private title: Title) {
    this.title.setTitle(environment.siteTitle);
  }
}
