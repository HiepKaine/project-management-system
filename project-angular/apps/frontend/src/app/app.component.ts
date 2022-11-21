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
      .get<Todo[]>('localhost:3000/api/todos')
      .subscribe((data) => (this.todos = data));
  }

  addTodo() {
    this.http.post('localhost:3000/api/addTodo', {}).subscribe(() => {
      this.fetch();
    });
  }
}
