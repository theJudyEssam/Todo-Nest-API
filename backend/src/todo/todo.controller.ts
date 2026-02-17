import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/crud-dtos/todoDto';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post('/')
  async createTodo(
    @Body() todo: CreateTodoDto,
  ) {
    return await this.todoService.createTodo(todo);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Put('/:id/update-status')
  async updateTodoStatus(
    @Param('id') id: number,
    @Body('completed') completed: boolean,
  ) {
    return this.todoService.updateTodoStatus(id, completed);
  }

  @Put('/:id/update-text')
  async updateTodoText(
    @Param('id') id: number,
    @Body('todoText') todoText: string,
  ) {
    return this.todoService.updateTodoText(id, todoText);
  }
}
export default TodoController;
