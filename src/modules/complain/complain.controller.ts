import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComplainService } from './complain.service';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';

@ApiTags('complains')
@Controller('complains')
export class ComplainController {
  constructor(private readonly complainService: ComplainService) { }

  @Get()
  async findAll() {
    try {
      let complains = await this.complainService.findAll();
      return {
        status: 200,
        message: "success",
        data: complains
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
      let complain = await this.complainService.findOne(id);
      if (!complain) {
        throw new Error("Complain is not found!")
      }
      return {
        status: 200,
        message: "success",
        data: complain
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @Post()
  async create(@Body() body: CreateComplainDto) {
    try {
      let newComplain = await this.complainService.create(body);
      return {
        status: 201,
        message: "successfully created!",
        data: newComplain
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateComplainDto) {
    try {
      let updatedComplain = await this.complainService.update(id, body);
      if (updatedComplain.affected > 0) {
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
      let complain = await this.complainService.delete(id);
      if (complain.affected > 0) {
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
