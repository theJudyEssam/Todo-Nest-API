import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createUserDto, updateUserDto } from 'src/dtos/userDto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(createUserDto: createUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
