import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { User } from 'src/users/schemas/user.schema'

export type WishlistDocument = HydratedDocument<Wishlist>

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  herbId: string

  @Prop()
  createdBy: User

  @Prop()
  createdAt: Date

  @Prop()
  updatedBy: User

  @Prop()
  updatedAt: Date

  @Prop()
  deletedBy: User

  @Prop()
  isDeleted: boolean
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist)
