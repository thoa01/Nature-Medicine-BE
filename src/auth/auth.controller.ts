import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { Public, ResponseMessage, User } from '../decorator/customize'
import { RegisterUserDto } from '../users/dto/create-user.dto'
import { IUser } from '../users/users.interface'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard) //check xem user login đúng account kh, nếu kh thì login lại, nếu login (thông qua passport) rồi thì gán user(trong validate) vào req.user
  @ResponseMessage('Login')
  @Post('login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response) //user của validate(local.strategy.ts) trả về //login tạo access_token
  }

  @ResponseMessage('Register account')
  @Public()
  @Post('register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }

  @ResponseMessage('Get new refresh token')
  @Get('refresh')
  handleRefreshToken(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const refreshToken = req.cookies['refreshToken']
    return this.authService.processNewRefreshToken(refreshToken, response)
  }

  @ResponseMessage('Get account')
  @Get('account')
  async handleGetAccount(@User() user: IUser) {
    const result = await this.authService.getAccount(user)
    return { data: result }
  }

  @ResponseMessage('Logout')
  @Get('logout')
  handleLogout(@User() user: IUser, @Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response, user)
  }
}
