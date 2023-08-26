import { Product } from "src/modules/product/entities/product.entity";
import { Store } from "src/modules/store/entities/store.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_category_name: string;

  @Column()
  status: boolean

  @ManyToOne(()=>Store, store=>store.productCategories)
  @JoinColumn({name: 'store_id'})
  store: Store;

  @OneToMany(()=>Product, product=>product.productCategory)
  products: Product;

}
