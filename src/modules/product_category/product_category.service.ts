import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product_category.entity';
import { Repository } from 'typeorm';
import { Store } from '../store/entities/store.entity';

@Injectable()
export class ProductCategoryService {
  constructor(@InjectRepository(ProductCategory) private readonly productCategoryRepo: Repository<ProductCategory> ,@InjectRepository(Store) private readonly storeRepo: Repository<Store>){}
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    let {store_id} = createProductCategoryDto
    let store = await this.storeRepo.findOne({where: {id: store_id}})
    if(!store){
      return new NotFoundException('such store not found')
    }
    let productCategory = this.productCategoryRepo.create({
      product_category_name: createProductCategoryDto.product_category_name,
      status: createProductCategoryDto.status,
      store
    })
    await this.productCategoryRepo.save(productCategory)
    return {
      status: 201,
      message: "new product_category added",
      data: productCategory
    };
  }

  async findAll() {
    let productCategories = await this.productCategoryRepo.find({relations: ["store"]})

    return {
      status: 200,
      message: "all product categories",
      data: productCategories
    };
  }

  async findOne(id: number) {
    let productCategory = await this.productCategoryRepo.findOne({where: {id}, relations: ["store"]})
    if(!productCategory){
      return new NotFoundException('product category is not found')
    }

    return {
      status: 200,
      message: "product categories by id",
      data: productCategory
    };
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    let productCategory = await this.productCategoryRepo.findOne({where: {id}})
    if(!productCategory){
      return new NotFoundException('product category not found')
    }
    productCategory.product_category_name = updateProductCategoryDto.product_category_name
    productCategory.status = updateProductCategoryDto.status
    await this.productCategoryRepo.save(productCategory)
    return {
      status: 200,
      message: 'updated',
      data: productCategory
    };
  }

  async remove(id: number) {
    let productCategory = await this.productCategoryRepo.findOne({where: {id}})
    if(!productCategory){
      return new NotFoundException('product category not found')
    }
    await this.productCategoryRepo.remove(productCategory)
    return {
      status: 200,
      message: 'successfully deleted'
    };
  }
}
