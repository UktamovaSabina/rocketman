import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module';
import { ComplainModule } from './modules/complain/complain.module';
import { DriverModule } from './modules/driver/driver.module';
import { CategoryModule } from './modules/category/category.module';
import { StoreModule } from './modules/store/store.module';
import { ProductCategoryModule } from './modules/product_category/product_category.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      password: process.env.PG_PASSWORD,
      username: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      synchronize: true,
      entities: [__dirname + "/modules/**/entities/*.entity.{ts,js}"]
    }),
    AuthModule,
    UserModule,
    ComplainModule,
    DriverModule,
    CategoryModule,
    StoreModule,
    ProductCategoryModule,
    ProductModule,
    // OrderModule,
    // PaymentModule
  ],
  controllers: [],
})
export class AppModule { }
