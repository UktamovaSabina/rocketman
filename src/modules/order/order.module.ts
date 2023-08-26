import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { Users } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Driver } from '../driver/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Users, Product, Driver])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
