import { Order } from "src/modules/order/entities/order.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  driver_name: string;

  @Column({ type: "date" })
  birth_date: Date;

  @Column({ type: "varchar" })
  phone_number: string

  @Column({ type: "varchar", unique: true })
  car_number: string

  @Column({ type: "varchar" })
  car_type: string

  @Column({ type: "boolean", default: false })
  status: boolean

  @OneToMany(()=> Order, order=>order.driver)
  orders: Order[]
}