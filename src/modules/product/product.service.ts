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
  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto)
    let {product_category_id} = createProductDto
    let product_category = await this.productCategoryRepo.findOne({where: {id: +product_category_id}})
    if(!product_category){
      return new NotFoundException("product category not found")
    }
    let newProduct = this.productRepo.create({
      product_name: createProductDto.product_name,
      product_description: createProductDto.product_description,
      product_image: createProductDto.product_image,
      product_image_link: createProductDto.product_image_link,
      product_price: createProductDto.product_price,
      status: createProductDto.status,
      productCategory: product_category
    })
    await this.productRepo.save(newProduct)
    console.log(newProduct)

    return {
      status: 201,
      message: "product created",
      data: newProduct
    };
  }

  async findAll() {
    let products = await this.productRepo.find({relations: ["productCategory"]})
    return {
      status: 200,
      message: 'all products',
      data: products
    }
  }

  async findOne(id: number) {
    let product = await this.productRepo.findOne({where: {id}, relations: ["productCategory"]})
    if(!product){
      return new NotFoundException('product is not found')
    }
    return {
      status: 200,
      message: 'single product',
      data: product
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let product = await this.productRepo.findOne({where: {id}})
    if(!product){
      return new NotFoundException("Product not found")
    }
      product.product_name = updateProductDto.product_name || product.product_name
      product.product_description = updateProductDto.product_description || product.product_description
      product.product_image = updateProductDto.product_image || product.product_image
      product.product_image_link = updateProductDto.product_image_link || product.product_image_link
      product.product_price = updateProductDto.product_price || product.product_price
      product.status = updateProductDto.status
    await this.productRepo.save(product)

    return {
      status: 200,
      message: "product updated",
      data: product
    }
  }

  async remove(id: number) {
    let product = await this.productRepo.findOne({where: {id}})
    if(!product){
      return new NotFoundException("Product not found")
    }
    await this.productRepo.remove(product)
    return {
      status: 200,
      message: 'product deleted'
    }
  }
}
