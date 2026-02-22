import { Injectable } from '@nestjs/common';
import { TodoCreateInput } from 'generated/prisma/models';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTodoDto } from 'src/crud-dtos/todoDto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodos() {
    return this.prisma.todo.findMany();
  }

  async getTodoById(id: number) {
    return this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

 async createTodo(todo:CreateTodoDto) {
  console.log("user id in service:", todo.userId);
  console.log("user content in service:", todo.content);
  return await this.prisma.todo.create({
    data: {
      content: todo.content,
      completed: todo.completed ?? false,
      user: {
        connect: { id: todo.userId} 
      }
    }
  });
}

  async deleteTodo(id: number) {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  async updateTodoStatus(id: number, completed: boolean) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });
  }

  async updateTodoText(id: number, todoText: string) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        content: todoText,
      },
    });
  }

  async approveTodo(id: number) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        status: 'APPROVED',
      },
    });
  }
  
  async rejectTodo(id: number) {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        status: 'REJECTED',
      },
    });
  }
}
export default TodoService;
