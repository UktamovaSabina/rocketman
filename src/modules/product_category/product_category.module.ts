import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product_category.entity';
import { Store } from '../store/entities/store.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Store])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, JwtStrategy],
})
export class ProductCategoryModule {}
