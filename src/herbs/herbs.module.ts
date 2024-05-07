import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HerbsController } from './herbs.controller'
import { HerbsService } from './herbs.service'
import { Herb, HerbSchema } from './schemas/herb.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Herb.name, schema: HerbSchema }])],
  controllers: [HerbsController],
  providers: [HerbsService]
})
export class HerbsModule {}
