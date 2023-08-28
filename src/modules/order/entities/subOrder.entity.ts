import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, RelationId, BaseEntity } from 'typeorm';
import {Product} from './../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class SubOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  count: number;

  @ManyToOne(() => Order, (order) => order.orders)
  order: Order;
}
