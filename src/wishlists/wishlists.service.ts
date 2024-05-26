import { Injectable } from '@nestjs/common'
import { CreateWishlistDto } from './dto/create-wishlist.dto'
import { UpdateWishlistDto } from './dto/update-wishlist.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Wishlist, WishlistDocument } from './entities/wishlist.entity'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import mongoose from 'mongoose'
import { IUser } from 'src/users/users.interface'
import { HerbsService } from 'src/herbs/herbs.service'

@Injectable()
export class WishlistsService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: SoftDeleteModel<WishlistDocument>,
    private herbsService: HerbsService
  ) {} //config để dùng soft-delete

  async create(createWishlistDto: CreateWishlistDto) {
    // console.log('log', createWishlistDto)

    const { userId, herbId } = createWishlistDto

    // Kiểm tra xem đã có bản ghi nào có userId và herbId
    const existingWishlist = await this.wishlistModel.findOne({ userId, herbId })

    if (existingWishlist) {
      // Nếu đã tồn tại, trả về bản ghi hiện có
      return { data: existingWishlist }
    } else {
      // Nếu chưa tồn tại, tạo mới bản ghi
      const herbInWishlist = await this.wishlistModel.create(createWishlistDto)
      return { data: herbInWishlist }
    }

    // const herbInWishlist = await this.wishlistModel.create(createWishlistDto)
    // return { data: herbInWishlist }
  }

  async findAll(user: IUser) {
    const wishlist = await this.wishlistModel.find({ userId: user._id })
    const herbIds = wishlist.map((item) => item.herbId)
    const herbs = await this.herbsService.getHerbsByIds(herbIds)
    return { data: { herbs } }
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Incorrect ID'
    return this.wishlistModel.softDelete({ _id: id })
  }
}
