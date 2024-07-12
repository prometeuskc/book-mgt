import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createCommand(createUserDto);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  findAll() {
    return this.usersService.findAllQuery();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneQuery(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateCommand(+id, updateUserDto);
  }
}
