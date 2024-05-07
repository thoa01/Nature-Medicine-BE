import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
import { HerbsModule } from './herbs/herbs.module';
import { FilesModule } from './files/files.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin) //soft-delete-plugin-mongoose: auto add deletedAt & isDeleted //global (tất cả Schema đều có)
          return connection
        }
      }),
      inject: [ConfigService]
    }), //.env
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    AuthModule,
    HerbsModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
