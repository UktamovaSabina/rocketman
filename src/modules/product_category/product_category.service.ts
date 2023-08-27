import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product_category.entity';
import { Repository } from 'typeorm';
import { Store } from '../store/entities/store.entity';

@Injectable()
export class ProductCategoryService {
  constructor(@InjectRepository(ProductCategory) private readonly productCategoryRepo: Repository<ProductCategory>, @InjectRepository(Store) private readonly storeRepo: Repository<Store>) { }

  async findAll() {
    try {
      let productCategories = await this.productCategoryRepo.find({ relations: { store: true, products: true } })
      return {
        status: 200,
        message: "all product categories",
        data: productCategories
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async findOne(id: number) {
    try {
      let productCategory = await this.productCategoryRepo.findOne({ where: { id }, relations: { store: true, products: true } })
      if (!productCategory) {
        throw new Error('store is not found')
      }
      return {
        status: 200,
        message: "product categories by id",
        data: productCategory
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async create(body: CreateProductCategoryDto) {
    try {
      let duplicate = await this.productCategoryRepo.findOneBy({ product_category_name: body.product_category_name })
      if (duplicate) {
        throw new Error('Product Category already exists')
      }
      let store = await this.storeRepo.findOne({ where: { id: body.store } })
      if (!store) {
        throw new Error('store is not found')
      }
      let productCategory = this.productCategoryRepo.create({ ...body, store: { id: body.store } })
      await this.productCategoryRepo.save(productCategory)
      return {
        status: 201,
        message: 'success',
        data: productCategory
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async update(id: number, body: UpdateProductCategoryDto) {
    try {
      let foundProductCategory = await this.productCategoryRepo.findOne({ where: { id }, relations: { store: true } })
      if (!foundProductCategory) {
        throw new Error('Product Category is not found')
      }
      let productCategory = await this.productCategoryRepo.update({ id }, { ...body, store: { id: foundProductCategory.store.id } })
      if (productCategory.affected > 0) {
        return {
          status: 205,
          message: 'successfully updated'
        }
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      let foundProductCategory = await this.productCategoryRepo.findOne({ where: { id } })
      if (!foundProductCategory) {
        throw new Error('Product Category is not found')
      }
      let deleted = await this.productCategoryRepo.delete({ id })
      if (deleted.affected > 0) {
        return {
          status: 204,
          message: 'successfully deleted'
        }
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }
}
