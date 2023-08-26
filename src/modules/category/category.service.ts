import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>) { }

  async findAll() {
    let categories = await this.categoryRepo.find({ relations: { stores: true } });
    return {
      status: 200,
      message: 'all categories',
      data: categories
    }
  }

  async findOne(id: number) {
    try {
      let category = await this.categoryRepo.findOne({ where: { id }, relations: { stores: true } })
      if (!category) {
        throw new Error('category is not found')
      }
      return {
        status: 200,
        message: 'category by id',
        data: category
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async create(body: CreateCategoryDto) {
    try {
      let duplicate = await this.categoryRepo.findOneBy({ category_name: body.category_name });
      if (duplicate) {
        throw new Error("Category_name already exists!")
      }
      let newCategory = this.categoryRepo.create(body);
      await this.categoryRepo.save(newCategory)
      return {
        status: 201,
        message: "created",
        data: newCategory
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async update(id: number, body: UpdateCategoryDto) {
    try {
      let user = await this.categoryRepo.update(id, body);
      if (user.affected > 0) {
        return {
          status: 205,
          message: "successfully updated!"
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
      let category = await this.categoryRepo.findOne({ where: { id } })
      if (!category) {
        throw new Error('Category is not found!')
      }
      await this.categoryRepo.remove(category)
      return {
        status: 200,
        message: 'successfully deleted'
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }
}
