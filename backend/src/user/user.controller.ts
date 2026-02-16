import { Controller, Delete, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(id: string) {
    return this.userService.getUserById(id);
  }

  @Get('/email/:email')
  async getUserByEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Delete('/:id')
  async deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }
}
