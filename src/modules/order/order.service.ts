import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../product/entities/product.entity';
import { Users } from '../user/entities/user.entity';
import { SubOrder } from './entities/subOrder.entity';
import { UpdateOrderDriverDto } from './dto/update-order.dto';
import { Driver } from '../driver/entities/driver.entity';
import { UpdateOrderStatusDto } from './dto/update-orderStatus.dto';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  @InjectRepository(Product) private readonly productRepo: Repository<Product>,
  @InjectRepository(Users) private readonly userRepo: Repository<Users>,
  @InjectRepository(Driver) private readonly driverRepo: Repository<Driver>) { }

  async findAll() {
    try {
      let orders = await this.orderRepo.find({ relations: { user: true, driver: true, orders: true} });
      return {
        status: 200,
        message: 'success',
        data: orders
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async findOne(id: number) {
<<<<<<< HEAD
    let result = await this.orderRepo.findOne({
      where: { id }, relations: { user: true, driver: true, products: true },
    });
    console.log(result);

    return result
    // let result = await this.orderRepo.findOneBy({id});
    // console.log(result);

    // return result
=======
    try {
      let order = await this.orderRepo.findOne({
        where: { id }, relations: { user: true, driver: true, orders: true },
      });
      
      if(!order){
        throw new Error('Order by id is not found')
      }

      return {
        status: 200,
        message: 'success',
        data: order
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async create(body: CreateOrderDto){
    try {
      const user = await this.userRepo.findOne({where: {id: body.user}});
        if (!user) {
            throw new Error('user not found');
        }
      const order = new Order()
      order.latitude = body.latitude
      order.longitude = body.longitude
      order.payment_type = body.payment_type
      order.user = user
      order.driver = null
      order.orders = []

      for(let item of body.products){
        let product = await this.productRepo.findOne({where: {id: item.product_id}})
        if(product){
          let subProducts = new SubOrder()
          subProducts.product = product
          subProducts.count = item.count
          order.orders.push(subProducts)
        } else {
          throw new Error(`product with ID: ${item.product_id} is not found`)
        }
      }

      await this.orderRepo.save(order)
      return {
        status: 201,
        message: "ok",
        data: order
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
>>>>>>> dev
  }
  
  async updateDriver(id: number, body: UpdateOrderDriverDto){
    try {
      let foundOrder = await this.orderRepo.findOne({where: {id}})
      if(!foundOrder){
        throw new Error(`Order with ${id} not found`)
      }
      let foundDriver = await this.driverRepo.findOne({where: {id: body.driver}})
      if(!foundDriver){
        throw new Error(`Driver with ${body.driver} not found`)
      }

      let orders = await this.orderRepo.update({id}, {driver: {id: body.driver}})
      let updateDriver = await this.driverRepo.update({id: body.driver}, {status: false})
      if(orders.affected > 0 && updateDriver.affected > 0){
        return {
          status: 204,
          message: 'successfully updated'
        }
      } else {
        throw new Error('something went wrong')
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async updateStatus(id: number, body: UpdateOrderStatusDto){
    try {
      let foundOrder = await this.orderRepo.findOne({where: {id}})
      if(!foundOrder){
        throw new Error(`Order with ${id} not found`)
      }
      let foundDriver = await this.driverRepo.findOne({where: {id: body.driver}})
      if(!foundDriver){
        throw new Error(`Driver with ${body.driver} not found`)
      }
      let order = {status: body.status}
      if(body.status === "bekor" || body.status === "yakun"){
        await this.driverRepo.update({id: body.driver}, {status: true})
      }

      let orders = await this.orderRepo.update({id}, order)
      if(orders.affected > 0){
        return {
          status: 204,
          message: 'successfully updated'
        }
      } else {
        throw new Error('something went wrong')
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async delete(id: number){
    try {
      let order = await this.orderRepo.findOne({where: {id}})
      if(!order){
        throw new Error(`Order with ID ${id} not found`)
      }
      let deleteOrder = await this.orderRepo.delete({id})
      if(deleteOrder.affected > 0){
        return {
          status: 205,
          message: 'successfully deleted'
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
