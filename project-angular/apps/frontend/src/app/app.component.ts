import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environment/environment';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'project-adngular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: Todo[] = [];
  
  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http
      .get<Todo[]>(`${environment.apiUrl}/todos`)
      .subscribe((data) => (this.todos = data));
  }

  addTodo() {
    this.http.post(`${environment.apiUrl}/addTodo`, {}).subscribe(() => {
      this.fetch();
    });
  }
}
