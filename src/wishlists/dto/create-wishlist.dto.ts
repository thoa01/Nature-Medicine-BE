import { IsNotEmpty } from 'class-validator'

export class CreateWishlistDto {
  userId: string

  @IsNotEmpty()
  herbId: string
}
