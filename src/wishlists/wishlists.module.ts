import { Module } from '@nestjs/common'
import { WishlistsService } from './wishlists.service'
import { WishlistsController } from './wishlists.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Wishlist, WishlistSchema } from './entities/wishlist.entity'
import { HerbsModule } from '../herbs/herbs.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }]), HerbsModule],

  controllers: [WishlistsController],
  providers: [WishlistsService]
})
export class WishlistsModule {}
