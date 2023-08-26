import { Order } from "src/modules/order/entities/order.entity";
import { ProductCategory } from "src/modules/product_category/entities/product_category.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_description: string

  @Column()
  product_image: string

  @Column()
  product_image_link: string

  @Column()
  product_price: number;

  @Column()
  status: boolean;

  @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
  productCategory: ProductCategory;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];

}
