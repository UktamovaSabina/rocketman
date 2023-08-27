import { Category } from "src/modules/category/entities/category.entity";
import { ProductCategory } from "src/modules/product_category/entities/product_category.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Store extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  store_name: string;

  @Column({ type: "varchar" })
  phone_number: string

  @Column({ type: "varchar" })
  address: string

  @Column({ type: "varchar" })
  longitude: string;

  @Column({ type: "varchar" })
  latitude: string;

  @Column({ type: "boolean" })
  status: boolean

  @ManyToOne(() => Category, category => category.stores)
  category: Category;

  @OneToMany(() => ProductCategory, product_category => product_category.store)
  productCategories: ProductCategory[]
}
