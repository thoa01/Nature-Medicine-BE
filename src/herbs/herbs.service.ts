import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { CreateHerbDto } from './dto/create-herb.dto'
import { UpdateHerbDto } from './dto/update-herb.dto'
import { Herb, HerbDocument } from './schemas/herb.schema'
import aqp from 'api-query-params'

@Injectable()
export class HerbsService {
  constructor(@InjectModel(Herb.name) private herbModel: SoftDeleteModel<HerbDocument>) {} //config để dùng soft-delete

  async create(createHerbDto: CreateHerbDto) {
    return await this.herbModel.create(createHerbDto)
  }

  async findAll(qs: string, limit: number, page: number) {
    const { filter, sort, population } = aqp(qs)
    delete filter.page
    delete filter.limit

    const offset = (+page - 1) * +limit
    const defaultLimit = +limit ? +limit : 16
    const totalItems = (await this.herbModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.herbModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec()
    return {
      data: {
        meta: {
          currentPage: page,
          pageSize: limit,
          totalPages: totalPages,
          totalItems: totalItems
        },
        herbs: result
      }
    }
  }
  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Not found herb'
    const result = await this.herbModel.findOne({ _id: id })
    return { data: result }
  }

  async update(updateHerbDto: UpdateHerbDto) {
    try {
      return await this.herbModel.updateOne({ _id: updateHerbDto._id }, { ...updateHerbDto })
    } catch (error) {
      return error
    }
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Incorrect ID'
    return this.herbModel.softDelete({ _id: id })
  }

  async getHerbsByIds(herbIds: string[]) {
    // Kiểm tra xem các herbId có hợp lệ không
    for (const id of herbIds) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { error: 'Invalid herbId' }
      }
    }

    // Lấy thông tin của các Herb dựa trên danh sách herbId
    const herbs = await this.herbModel.find({ _id: { $in: herbIds } })

    return herbs
  }
}
