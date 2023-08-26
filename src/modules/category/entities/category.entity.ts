import { Store } from "src/modules/store/entities/store.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  category_name: string;

  @Column({ type: "boolean" })
  status: boolean;

  @OneToMany(() => Store, (store) => store.categoryId)
  stores: Store
}