import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>) { }

  async findAll() {
    try {
      let payments = await this.paymentRepo.find()
      return {
        status: 200,
        message: 'all payments',
        data: payments
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async findOne(id: number) {
    try {
      let payment = await this.paymentRepo.findOne({ where: { id } })
      if (!payment) {
        throw new Error('payment not found')
      }
      return {
        status: 200,
        message: 'single payment',
        data: payment
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async create(body: CreatePaymentDto) {
    try {
      let duplicate_name = await this.paymentRepo.findOneBy({ payment_name: body.payment_name });
      if (duplicate_name) {
        throw new Error("Payment name already exists!")
      }

      let payment = this.paymentRepo.create(body)
      await this.paymentRepo.save(payment)
      return {
        status: 201,
        message: 'success',
        data: payment
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async updatePayment(id: number, body: UpdatePaymentDto) {
    try {
      let foundPayment = await this.paymentRepo.findOneBy({ id });
      if (!foundPayment) {
        throw new Error("Payment is not found!")
      }
      let result = await this.paymentRepo.update({ id }, body);
      if (result.affected > 0) {
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

  async remove(id: number) {
    try {
      let pay = await this.paymentRepo.findOneBy({ id });
      if (!pay) {
        throw new Error("Payment is not found!")
      }
      let result = await this.paymentRepo.delete({ id });
      if (result.affected > 0) {
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
