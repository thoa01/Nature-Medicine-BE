import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Public, ResponseMessage } from '../decorator/customize'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseMessage('Create user')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Public()
  @ResponseMessage('Get user information by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @ResponseMessage('Update user')
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto)
  }

  @ResponseMessage('Delete user')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
