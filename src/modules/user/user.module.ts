import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports:[ TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
