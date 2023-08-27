import { Order } from "src/modules/order/entities/order.entity";
import { ProductCategory } from "src/modules/product_category/entities/product_category.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  product_name: string;

  @Column({type: 'varchar'})
  product_description: string

  @Column({type: 'varchar'})
  product_image_link: string

  @Column({type: 'numeric'})
  product_price: number;

  @Column({type: 'boolean'})
  status: boolean;

  @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
  productCategory: ProductCategory;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
}
