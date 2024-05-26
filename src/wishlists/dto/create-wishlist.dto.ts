import { IsNotEmpty } from 'class-validator'
import { Herb } from 'src/herbs/schemas/herb.schema'
import { User } from 'src/users/schemas/user.schema'

export class CreateWishlistDto {
  userId: string

  @IsNotEmpty()
  herbId: string
}
