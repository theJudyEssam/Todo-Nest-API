import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/utils/enums/Role';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Roles(Role.ADMIN)
  @Get('/:id')
  async getUserById(@Param("id") id: string) {
    console.log("id in controller:", id);
    return this.userService.getUserById(id);
  }

  @Roles(Role.ADMIN)
  @Get('/email/:email')
  async getUserByEmail(@Param("email") email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
