import { Complains } from "src/modules/complain/entities/complain.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Users extends BaseEntity {
  @PrimaryColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar" })
  firstname: string;

  @Column({ type: "varchar" })
  lastname: string;

  @Column({ type: "varchar" })
  phone_number: string

  @OneToMany(() => Complains, (complain) => complain.user, {cascade: true})
  complains: Complains[]

  @OneToMany(() => Order, order => order.user, {cascade: true})
  orders: Order[]
}

