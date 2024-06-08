import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import ms from 'ms'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './passport/jwt.strategy'
import { LocalStrategy } from './passport/local.strategy'

@Module({
  //connect config service
  providers: [AuthService, LocalStrategy, JwtStrategy], //thêm LocalStrategy để đăng nhập với email, pass //thêm  để biết giải mã jwt
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: ms(configService.get('JWT_ACCESS_TOKEN_EXPIRE')) / 1000 //miliseconds/1000=second //ms: string convert to milisecond
        }
      }),
      inject: [ConfigService]
    })
  ], //import PassportModule để có thể tư động chạy hàm validate(local.strategy.ts) khi login
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
