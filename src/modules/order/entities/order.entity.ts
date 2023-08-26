import { Driver } from "src/modules/driver/entities/driver.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Users } from "src/modules/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

enum Order_status {
  BUYURTMA = "buyurtma",
  QABUL = "qabul",
  YETKAZISH = "yetkazish",
  YAKUN = "yakun",
  BEKOR = "bekor"
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "enum", enum: Order_status })
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

  @ManyToMany(() => Product, product => product.orders)
  products: Product[];

}
