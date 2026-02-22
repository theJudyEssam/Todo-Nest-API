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
import { Roles } from 'src/auth/decorator/role.decorator';
import {Role} from "../utils/enums/Role";
@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /*
  Users: Can Add, Delete, and Update Tasks.
  Reviewers: Can review todos and either accept or deny them.
  Admins: Have all permissions
  */ 

  @Roles() 
  @Get('/')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Roles() 
  @Get('/:id')
  async getTodoById(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Post('/')
  async createTodo(
    @Body() todo: CreateTodoDto,
  ) {
    return await this.todoService.createTodo(todo);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Delete('/:id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Put('/:id/update-status')
  async updateTodoStatus(
    @Param('id') id: number,
    @Body('completed') completed: boolean,
  ) {
    return this.todoService.updateTodoStatus(id, completed);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Put('/:id/update-text')
  async updateTodoText(
    @Param('id') id: number,
    @Body('todoText') todoText: string,
  ) {
    return this.todoService.updateTodoText(id, todoText);
  }


  @Roles(Role.ADMIN, Role.REVIEWER)
  @Put('/:id/approve')
  async approveTodo(@Param('id') id: number) {
    return this.todoService.approveTodo(id);
  }

  @Roles(Role.ADMIN, Role.REVIEWER)
  @Put('/:id/reject')
  async rejectTodo(@Param('id') id: number) {
    return this.todoService.rejectTodo(id);
  }
}
export default TodoController;
