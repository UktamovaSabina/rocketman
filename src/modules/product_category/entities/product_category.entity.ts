import { Product } from "src/modules/product/entities/product.entity";
import { Store } from "src/modules/store/entities/store.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  product_category_name: string;

  @Column({type: 'boolean'})
  status: boolean

  @ManyToOne(()=>Store, store=>store.productCategories)
  store: Store;

  @OneToMany(()=>Product, product=>product.productCategory)
  products: Product;

}
