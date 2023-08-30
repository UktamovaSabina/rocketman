import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDriverDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';
import { FindOrderStatus } from './dto/find-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  async findAll(@Query('status') status: string) {
    return await this.orderService.findAll(status)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findOne(id)
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateOrderDto) {
    return await this.orderService.create(body)
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Patch('drivers/:id')
  async updateDriver(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOrderDriverDto) {
    return await this.orderService.updateDriver(id, body);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Patch('status/:id')
  async updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateOrderStatusDto) {
    return await this.orderService.updateStatus(id, body);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.delete(id)
  }
}
