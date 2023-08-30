import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private readonly userRepo: Repository<Users>) { }

  async findAll() {
    let users = await this.userRepo.find({ relations: { complains: true, orders: true } });
    return users
  }

  async findOne(id: number) {
    try {
      let data = await this.userRepo.findOne({
        where: { id }, relations: { orders: { orders: true, driver: true }, complains: true },
      });

      const updatedOrders = data.orders.map(order => ({
        ...order,
        total_price: order.orders.reduce((total, subOrder) => total + (subOrder.count * subOrder.product.product_price), 0)
      }));

      const result = {
        ...data,
        orders: updatedOrders
      };

      return result
    } catch (error) {
      return error
    }
  }

  async create(body: CreateUserDto) {
    let duplicate = await this.userRepo.findOneBy({ id: body.id });
    if (duplicate) {
      throw new Error("id already exists")
    }
    if (!body.phone_number.startsWith("+998")) {
      throw new Error("Phone number must start with +998")
    }
    const user = this.userRepo.create(body);
    this.userRepo.save(user);
    return user
  }

  async update(id: number, body: UpdateUserDto) {
    let foundUser = await this.userRepo.findOneBy({ id });
    if (!foundUser) {
      throw new Error("User is not found!")
    }
    if (body?.id) {
      throw new Error("Id is not changeable!")
    }
    if (body.phone_number && !body.phone_number?.startsWith("+998")) {
      throw new Error("Phone number must start with +998")
    }
    return await this.userRepo.update({ id }, body);
  }

  async delete(id: number) {
    let foundUser = await this.userRepo.findOneBy({ id });
    if (!foundUser) {
      throw new Error("User is not found!")
    }
    return await this.userRepo.delete({ id });
  }
}
