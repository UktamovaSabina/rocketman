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
      let allOrders = await this.orderRepo.find({ relations: { user: true, driver: true, orders: true } });
      let orders = JSON.parse(JSON.stringify(allOrders));

      if (!orders.length) {
        return {
          status: 200,
          message: 'all orders',
          data: orders
        }
      }

      for (const order of orders) {
        let totalPrice = 0;

        for (const orderItem of order.orders) {
          const productPrice = orderItem.product.product_price;
          const itemCount = orderItem.count;
          const subtotal = productPrice * itemCount;
          totalPrice += subtotal;
        }

        order.totalPrice = totalPrice;
      }
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
    try {
      let order = await this.orderRepo.findOne({
        where: { id }, relations: { user: true, driver: true, orders: true },
      });

      if (!order) {
        throw new Error('Order by id is not found')
      }

      const totalPrice = order.orders.reduce((total, orderItem) => {
        const productPrice = orderItem.product.product_price;
        const itemCount = orderItem.count;
        const subtotal = productPrice * itemCount;
        return total + subtotal;
      }, 0);

      return {
        status: 200,
        message: 'success',
        data: order,
        totalPrice
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async create(body: CreateOrderDto) {
    try {
      const user = await this.userRepo.findOne({ where: { id: body.user }, relations: { orders: true } });
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

      for (let item of body.products) {
        let product = await this.productRepo.findOne({ where: { id: item.product_id } })
        if (product) {
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
  }

  async updateDriver(id: number, body: UpdateOrderDriverDto) {
    try {
      let foundOrder = await this.orderRepo.findOne({ where: { id }, relations: { driver: true, user: true, orders: true } })
      if (!foundOrder) {
        throw new Error(`Order with ${id} not found`)
      }
      let foundDriver = await this.driverRepo.findOne({ where: { id: body.driver } })
      if (!foundDriver) {
        throw new Error(`Driver with ${body.driver} not found`)
      }

      let orders = await this.orderRepo.update({ id }, { driver: { id: body.driver } })
      let updateDriver = await this.driverRepo.update({ id: body.driver }, { status: false })
      if (orders.affected > 0 && updateDriver.affected > 0) {
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

  async updateStatus(id: number, body: UpdateOrderStatusDto) {
    try {
      let foundOrder = await this.orderRepo.findOne({ where: { id }, relations: { driver: true, user: true, orders: true } })
      if (!foundOrder) {
        throw new Error(`Order with ${id} not found`)
      } else if (foundOrder.status == "bekor" || foundOrder.status == "yakun") {
        throw new Error('You can not change status')
      } else if (!foundOrder.driver) {
        throw new Error('You need to assign a driver before changing status')
      }
      let foundDriver = await this.driverRepo.findOne({ where: { id: foundOrder.driver.id } })
      if (!foundDriver) {
        throw new Error(`Driver with ${foundOrder.driver.id} not found`)
      }
      let order = { status: body.status }

      let orders = await this.orderRepo.update({ id }, order)
      if (body.status === "bekor" || body.status === "yakun") {
        await this.driverRepo.update({ id: foundDriver.id }, { status: true })
      }
      if (orders.affected > 0) {
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

  async delete(id: number) {
    try {
      let order = await this.orderRepo.findOne({ where: { id } })
      if (!order) {
        throw new Error(`Order with ID ${id} not found`)
      }
      let deleteOrder = await this.orderRepo.delete({ id })
      if (deleteOrder.affected > 0) {
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
