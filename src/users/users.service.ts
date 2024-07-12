import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '@app/database';

@Injectable()
export class UsersService {
  constructor(private readonly context: DatabaseService) {}

  async createCommand(createUserDto: CreateUserDto) {
    const exists = await this.context.user.findFirst({
      where: {
        name: createUserDto.name,
      },
    });

    if (exists) {
      throw new BadRequestException('Record is already exists.');
    }

    try {
      return await this.context.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }

  async updateCommand(id: number, updateUserDto: UpdateUserDto) {
    const exists = await this.context.user.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new BadRequestException('Record not found.');
    }

    try {
      return await this.context.user.update({
        where: { id },
        data: {
          ...updateUserDto,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.messages);
    }
  }

  async findAllQuery() {
    return this.context.user.findMany();
  }

  async findOneQuery(id: number) {
    return this.context.user.findFirst({
      where: {
        id,
      },
    });
  }
}
