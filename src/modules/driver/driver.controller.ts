import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Get()
  async findAll() {
    try {
      let drivers = await this.driverService.findAll();
      return {
        status: 200,
        message: "Success",
        data: drivers
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
      let driver = await this.driverService.findOne(id);
      if (!driver) {
        throw new Error("Driver is not found!")
      }
      return {
        status: 200,
        message: "success",
        data: driver
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateDriverDto) {
    try {
      let newDriver = await this.driverService.create(body);
      return {
        status: 201,
        message: "successfully created!",
        data: newDriver
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDriverDto) {
    try {
      let driver = await this.driverService.update(id, body);
      if (driver.affected > 0) {
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

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      let driver = await this.driverService.delete(id);
      if (driver.affected > 0) {
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
