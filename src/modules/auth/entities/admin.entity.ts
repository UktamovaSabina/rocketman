import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum AdminRole {
  ADMIN = "admin",
  SUPER_ADMIN = "super-admin"
}

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type : "varchar"})
  username: string;

  @Column({type: "varchar"})
  password: string;

  @Column({
    type: "enum",
    enum: AdminRole
  })
  role: AdminRole
}