import { Controller, Delete, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('todos')
  getData() {
    return this.appService.getData();
  }

  @Post('addTodo')
  addTodo() {
    return this.appService.addTodo();
  }

  @Delete('deleteTodo/{index}')
  delete() {
    return this.appService.deleteTodo(1);
  }

}
