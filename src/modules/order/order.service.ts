import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  @InjectRepository(Product) private readonly productRepo: Repository<Product>) { }

  async findAll() {
    let orders = await this.orderRepo.find({ relations: { user: true, driver: true, products: true } });
    return orders
  }

  async findOne(id: number) {
    let result = await this.orderRepo.findOne({
      where: { id }, relations: { user: true, driver: true, products: true },
    });
    console.log(result);
    
    return result
    // let result = await this.orderRepo.findOneBy({id});
    // console.log(result);
    
    // return result
  }

  async create(body: CreateOrderDto){
    try {
      console.log(body, 'body in service')
      let products = await Promise.all( body.products.map((async productInfo => {
        let product = await this.productRepo.findOne({where: {id: productInfo.product_id}})
        if(!product){
          throw new Error(`Product with ID ${productInfo.product_id} not found`)
        }
        return {...product, count: productInfo.count}
      })))
      console.log(products, 'products')

      let newOrder = this.orderRepo.create({
        payment_type: body.payment_type,
        longitude: body.longitude,
        latitude: body.latitude,
        user: {id: body.user},
        driver: null,
      })

      newOrder.products = products.map(productInfo => ({
        product: productInfo.product,
        count: productInfo.count,
      }));

      return 'ok'
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  //   async create(body: CreateUserDto) {
  //     let duplicate = await this.orderRepo.findOneBy({ id: body.id });
  //     if (duplicate) {
  //       throw new Error("id already exists")
  //     }
  //     if (!body.phone_number.startsWith("+998")) {
  //       throw new Error("Phone number must start with +998")
  //     }
  //     const user = this.orderRepo.create(body);
  //     this.orderRepo.save(user);
  //     return user
  //   }

  //   async update(id: number, body: UpdateUserDto) {
  //     let foundUser = await this.orderRepo.findOneBy({ id });
  //     if (!foundUser) {
  //       throw new Error("User is not found!")
  //     }
  //     if (body.id) {
  //       throw new Error("Id is not changeable!")
  //     }
  //     if (body.phone_number && !body.phone_number?.startsWith("+998")) {
  //       throw new Error("Phone number must start with +998")
  //     }
  //     return await this.orderRepo.update({ id }, body);
  //   }

  //   async delete(id: number) {
  //     let foundUser = await this.orderRepo.findOneBy({ id });
  //     if (!foundUser) {
  //       throw new Error("User is not found!")
  //     }
  //     return await this.orderRepo.delete({ id });
  //   }
}
