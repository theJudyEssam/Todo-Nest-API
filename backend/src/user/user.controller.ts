import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorator/public.decorator';

@Public()
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param("id") id: string) {
    console.log("id in controller:", id);
    return this.userService.getUserById(id);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param("email") email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Delete('/:id')
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
