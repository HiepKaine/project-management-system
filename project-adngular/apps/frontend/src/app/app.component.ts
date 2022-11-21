import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
      .get<Todo[]>('/api/todos')
      .subscribe((data) => (this.todos = data));
  }

  addTodo() {
    this.http.post('/api/addTodo', {}).subscribe(() => {
      this.fetch();
    });
  }
}
