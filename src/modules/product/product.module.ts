import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from '../product_category/entities/product_category.entity';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory])],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy],
})
export class ProductModule {}
