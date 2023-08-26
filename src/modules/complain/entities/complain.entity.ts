import { Users } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Complains extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  complain_text: string;

  @ManyToOne(() => Users, (user)=> user.complains)
  user: Users;
}