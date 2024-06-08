import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { WishlistsService } from './wishlists.service'
import { CreateWishlistDto } from './dto/create-wishlist.dto'
import { UpdateWishlistDto } from './dto/update-wishlist.dto'
import { ResponseMessage, User } from '../decorator/customize'
import { IUser } from '../users/users.interface'

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @ResponseMessage('Add a herb in wishlist')
  create(@Body() createWishlistDto: CreateWishlistDto, @User() user: IUser) {
    // console.log('d', { ...createWishlistDto, userId: user._id })
    return this.wishlistsService.create({ ...createWishlistDto, userId: user._id })
  }

  @ResponseMessage('Get all herbs in wishlist by user')
  @Get()
  findAllHerbsInWishlistByUser(@User() user: IUser) {
    return this.wishlistsService.findAll(user)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistsService.update(+id, updateWishlistDto)
  }

  @ResponseMessage('Delete a herb in wishlist')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(id)
  }
}
