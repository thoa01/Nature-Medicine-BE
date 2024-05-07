import { Injectable } from '@nestjs/common'
import { CreateHerbDto } from './dto/create-herb.dto'
import { UpdateHerbDto } from './dto/update-herb.dto'
import { Herb, HerbDocument } from './schemas/herb.schema'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

@Injectable()
export class HerbsService {
  constructor(@InjectModel(Herb.name) private herbModel: SoftDeleteModel<HerbDocument>) {} //config để dùng soft-delete

  async create(createHerbDto: CreateHerbDto) {
    return await this.herbModel.create(createHerbDto)
  }

  findAll() {
    return `This action returns all herbs`
  }

  findOne(id: number) {
    return `This action returns a #${id} herb`
  }

  update(id: number, updateHerbDto: UpdateHerbDto) {
    return `This action updates a #${id} herb`
  }

  remove(id: number) {
    return `This action removes a #${id} herb`
  }
}
