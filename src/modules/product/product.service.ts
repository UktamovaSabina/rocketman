import { CreateCategoryDto } from './../category/dto/create-category.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from '../product_category/entities/product_category.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepo:Repository<Product>, @InjectRepository(ProductCategory) private readonly productCategoryRepo:Repository<ProductCategory> ){}
  
  async findAll() {
    try {
      let products = await this.productRepo.find({relations: {productCategory: true}})
      return {
        status: 200,
        message: 'all products',
       data: products
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async findOne(id: number) {
   try {
    let product = await this.productRepo.findOne({where: {id}, relations: {productCategory: true}})
    if(!product){
      throw new Error('product is not found')
    }
    return {
      status: 200,
      message: 'single product',
      data: product
    }
   } catch (error) {
    return {
      status: 400,
      message: error.message
    }
   }
  }

  async create(body: CreateProductDto) {
    console.log(body)
    try {
      let foundProduct = await this.productRepo.findOneBy({product_name: body.product_name})
      if(!foundProduct){
        throw new Error('Product already exists')
      }
      let foundProductCategory = await this.productCategoryRepo.findOne({where: {id: body.productCategory}})
      if(!foundProductCategory){
        throw new Error('Product Category not found')
      }

      let newProduct = this.productRepo.create({...body, productCategory: {id: body.productCategory}})
      await this.productRepo.save(newProduct)
      return {
        status: 201,
        message: 'success',
        data: newProduct
      }

    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async update(id: number, body: UpdateProductDto) {
    try {
      let foundProduct = await this.productRepo.findOne({where: {id}, relations: {productCategory: true}})
      if(!foundProduct){
        throw new Error('Product is not found')
      }
      let product = await this.productRepo.update({id}, {...body, productCategory: {id: foundProduct.productCategory.id}})
      if(product.affected > 0){
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
      let foundProduct = await this.productRepo.findOne({where: {id}, relations: {productCategory: true}})
      if(!foundProduct){
        throw new Error('Product is not found')
      }
      let deletedProduct = await this.productRepo.delete({id})
      if(deletedProduct.affected > 0){
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
