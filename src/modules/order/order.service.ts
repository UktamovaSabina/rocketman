import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>) { }

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
