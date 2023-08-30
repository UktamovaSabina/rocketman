import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Order])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule { }
