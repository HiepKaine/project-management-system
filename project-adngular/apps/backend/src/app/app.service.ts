import { Injectable } from '@nestjs/common';

interface Todo {
  title: string;
}

@Injectable()
export class AppService {
  todos: Todo[] = [
    { title: 'title 1' },
    { title: 'title 2' },
    { title: 'title 3' },
  ];

  getData(): Todo[] {
    return this.todos;
  }

  addTodo() {
    return this.todos.push({
      title: `new todo ${Math.random() * 1000}`,
    });
  }
}
