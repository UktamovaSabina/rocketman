import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDriverDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.orderService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findOne(id)
  }

    @Post()
    async create(@Body() body: CreateOrderDto) {
      console.log(body, 'body in controller')
      return await this.orderService.create(body)
    }

    @Patch('drivers/:id')
    async updateDriver(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOrderDriverDto) {
        return await this.orderService.updateDriver(id, body);
    }

    @Patch('status/:id')
    async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOrderStatusDto) {
        return await this.orderService.updateStatus(id, body);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return await this.orderService.delete(id)
    }
}
