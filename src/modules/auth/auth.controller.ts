import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt.guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  getAll() {
    return this.authService.getAll();
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      let newAdmin = await this.authService.register(body);
      return newAdmin
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }
}