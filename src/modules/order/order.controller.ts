import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly OrderService: OrderService) { }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      let orders = await this.OrderService.findAll();
      return {
        status: 200,
        message: "Success",
        data: orders
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
      let order = await this.OrderService.findOne(id);
      if (!order) {
        throw new Error("Order is not found!")
      }
      return {
        status: 200,
        message: "success",
        data: order
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  //   @Post()
  //   async create(@Body() body: CreateUserDto) {
  //     try {
  //       let newUser = await this.OrderService.create(body);
  //       return {
  //         status: 201,
  //         message: "successfully created!",
  //         data: newUser
  //       }
  //     } catch (error) {
  //       return {
  //         status: 400,
  //         message: error.message
  //       }
  //     }
  //   }

  //   @Patch(':id')
  //   async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
  //     try {
  //       let user = await this.OrderService.update(id, updateUserDto);
  //       if (user.affected > 0) {
  //         return {
  //           status: 205,
  //           message: "successfully updated!"
  //         }
  //       }
  //     } catch (error) {
  //       return {
  //         status: 400,
  //         message: error.message
  //       }
  //     }
  //   }

  //   @Delete(':id')
  //   async remove(@Param('id', ParseIntPipe) id: number) {
  //     try {
  //       let user = await this.OrderService.delete(id);
  //       if (user.affected > 0) {
  //         return {
  //           status: 204,
  //           message: "successfully deleted!"
  //         }
  //       }
  //     } catch (error) {
  //       return {
  //         status: 400,
  //         message: error.message
  //       }
  //     }
  //   }
}
