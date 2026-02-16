import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/dtos/todoDto';

@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  async getTodoById( @Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @Post('/')
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Put('/:id/update-status')
  async updateTodoStatus(@Param('id') id: number, @Body('completed') completed: boolean) {
    return this.todoService.updateTodoStatus(id, completed);
  }

  @Put('/:id/update-text')
  async updateTodoText(@Param('id') id: number, @Body('todoText') todoText: string) {
    return this.todoService.updateTodoText(id, todoText);
  }
}
export default TodoController;
