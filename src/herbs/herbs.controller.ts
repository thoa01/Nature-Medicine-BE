import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { HerbsService } from './herbs.service'
import { CreateHerbDto } from './dto/create-herb.dto'
import { UpdateHerbDto } from './dto/update-herb.dto'
import { Public, ResponseMessage } from 'src/decorator/customize'

@Controller('herbs')
export class HerbsController {
  constructor(private readonly herbsService: HerbsService) {}

  @Public()
  @ResponseMessage('Add a herb')
  @Post()
  create(@Body() createHerbDto: CreateHerbDto) {
    return this.herbsService.create(createHerbDto)
  }

  @Public()
  @ResponseMessage('Get all herbs')
  @Get()
  findAll(@Query() qs: string, @Query('limit') limit: number, @Query('page') page: number) {
    return this.herbsService.findAll(qs, limit, page)
  }

  @Public()
  @ResponseMessage('Get herb information by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.herbsService.findOne(id)
  }

  @Public()
  @ResponseMessage('Update a herb')
  @Patch()
  update(@Body() updateUserDto: UpdateHerbDto) {
    return this.herbsService.update(updateUserDto)
  }

  @ResponseMessage('Delete a herb')
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.herbsService.remove(id)
  }
}
