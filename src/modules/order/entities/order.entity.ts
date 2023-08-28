import { Driver } from "src/modules/driver/entities/driver.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Users } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubOrder } from "./subOrder.entity";

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

  @CreateDateColumn({ type: "date" })
  created_at: Date

  @ManyToOne(() => Users, user => user.orders)
  user: Users

  @ManyToOne(() => Driver, driver => driver.orders)
  driver: Driver;

  // @ManyToMany(() => Product, products=>products.orders)
  // @JoinTable()
  // products: Product[];

  @OneToMany(() => SubOrder, (subOrder) => subOrder.order, { cascade: true })
  orders: SubOrder[];
}
