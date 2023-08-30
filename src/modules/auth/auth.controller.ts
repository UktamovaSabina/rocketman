import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from './guards/jwt.guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAdminDto) {
    try {
      let user = await this.authService.update(id, body);
      if (user.affected > 0) {
        return {
          status: 205,
          message: "successfully updated!"
        }
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      let admin = await this.authService.delete(id);
      if (admin.affected > 0) {
        return {
          status: 204,
          message: "successfully deleted!"
        }
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }
}