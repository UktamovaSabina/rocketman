import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Category } from '../category/entities/category.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Category])],
  controllers: [StoreController],
  providers: [StoreService, JwtStrategy],
})
export class StoreModule { }
