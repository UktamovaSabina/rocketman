import { Driver } from "src/modules/driver/entities/driver.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Users } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum Order_status {
  BUYURTMA = "buyurtma",
  QABUL = "qabul",
  YETKAZISH = "yetkazish",
  YAKUN = "yakun",
  BEKOR = "bekor"
}

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "enum", enum: Order_status, default: Order_status.BUYURTMA })
  status: Order_status;

  @Column({ type: "varchar" })
  payment_type: string;

  @Column({ type: "varchar" })
  longitude: string;

  @Column({ type: "varchar" })
  latitude: string;

  @Column({ type: "date" })
  created_at: Date

  @ManyToOne(() => Users, user => user.orders)
  user: Users

  @ManyToOne(() => Driver, driver => driver.orders)
  driver: Driver;

  @ManyToMany(() => Product, {eager: true})
  @JoinTable({
    name: 'order_product', // Change this to your actual join table name
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

}
