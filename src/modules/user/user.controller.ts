import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      let users = await this.userService.findAll();
      return {
        status: 200,
        message: "Success",
        data: users
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      let user = await this.userService.findOne(id);
      if (!user) {
        throw new Error("User is not found!")
      }
      return {
        status: 200,
        message: "success",
        data: user
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      let newUser = await this.userService.create(body);
      return {
        status: 201,
        message: "successfully created!",
        data: newUser
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    try {
      let user = await this.userService.update(id, body);
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

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      let user = await this.userService.delete(id);
      if (user.affected > 0) {
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
