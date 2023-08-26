import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>){}
  async create(createPaymentDto: CreatePaymentDto) {
    let payment = this.paymentRepo.create({...createPaymentDto, status: true})
    await this.paymentRepo.save(payment)
    return {
      status: HttpStatus.CREATED,
      message: 'success',
      data: [payment]
    }
  }

  async findAll() {
    let payments = await this.paymentRepo.find()

    return {
      status: HttpStatus.OK,
      message: 'all payments',
      data: payments
    };
  }

  async findOne(id: number) {
    let payment = await this.paymentRepo.findOne({where: {id}})
    if(!payment){
      return new NotFoundException('payment not found')
    }
    return {
      status: HttpStatus.OK,
      message: 'single payment',
      data: [payment]
    };
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    let payment = await this.paymentRepo.findOne({where: {id}})
    if(!payment){
      return new NotFoundException('payment not found')
    }
    await this.paymentRepo.update(id, updatePaymentDto)

    return {
      status: HttpStatus.ACCEPTED,
      message: 'Payment updated'
    }
  }

  async updatePaymentStatus(id: number, updatePaymentStatusDto: UpdatePaymentStatusDto){
    let payment = await this.paymentRepo.findOne({where: {id}})
    if(!payment){
      return new NotFoundException('payment not found')
    }
    payment.status = updatePaymentStatusDto.status
    await this.paymentRepo.save(payment)
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Payment status updated'
    }
  }

  async remove(id: number) {
    let payment = await this.paymentRepo.findOne({where: {id}})
    if(!payment){
      return new NotFoundException('payment not found')
    }
    await this.paymentRepo.softDelete(id)
    return {
      status: HttpStatus.OK,
      message: "Payment deleted"
    }
  }
}
