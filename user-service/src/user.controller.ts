import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Get('details')
  @UseGuards(JwtAuthGuard)
  async userDetails(@Req() req) {
    const userId = req.user.id;
    return this.userService.getUserDetails(userId);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { sessionId, userId } = await this.userService.login(loginDto);
    const token = this.jwtService.sign({ sessionId, userId });
    return { token, userId };
  }
}
