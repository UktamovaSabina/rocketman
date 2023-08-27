import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @Post()
  async create(@Body() body: CreatePaymentDto) {
    return await this.paymentService.create(body);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @Patch(':id')
  updatePayment(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePaymentDto) {
    return this.paymentService.updatePayment(id, body);
  }

  @ApiBearerAuth("defaultBearerAuth")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
