import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, LoginDto } from './schema/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

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

  @Post('validate-token')
  @UseGuards(JwtAuthGuard)
  validateToken(@Body('token') token: string): boolean {
    try {
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      // If the verification succeeds, return true
      return true;
    } catch (error) {
      return false;
    }
  }
}
