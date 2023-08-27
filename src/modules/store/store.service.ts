import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class StoreService {
  constructor(@InjectRepository(Store) private readonly storeRepo: Repository<Store>, @InjectRepository(Category) private readonly categoryRepo: Repository<Category>) { }

  async findAll() {
    try {
      let stores = await this.storeRepo.find({ relations: { category: true, productCategories: true } })
      return {
        status: 200,
        message: 'all stores',
        data: stores
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
      let store = await this.storeRepo.findOne({ where: { id }, relations: { category: true, productCategories: true } })
      if (!store) {
        throw new Error('store is not found')
      }
      return {
        status: 200,
        message: 'store by id',
        data: store
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async create(body: CreateStoreDto) {
    try {
      const duplicate = await this.storeRepo.findOneBy({ store_name: body.store_name })
      if (duplicate) {
        throw new Error("Store name already exists!")
      }
      const category = await this.categoryRepo.findOne({ where: { id: body.category } });
      if (!category) {
        throw new Error("category is not found!")
      }
      if (!body.phone_number.startsWith("+998")) {
        throw new Error("Phone number must start with +998")
      }
      const store = this.storeRepo.create({ ...body, category: { id: body.category } });
      await this.storeRepo.save(store);
      return {
        status: 201,
        message: 'success',
        data: store
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async update(id: number, body: UpdateStoreDto) {
    try {
      let foundStore = await this.storeRepo.findOne({ where: { id }, relations: { category: true } });
      console.log(foundStore);

      if (!foundStore) {
        throw new Error("Store is not found!")
      }
      if (body.phone_number && !body.phone_number?.startsWith("+998")) {
        throw new Error("Phone number must start with +998")
      }
      let store = await this.storeRepo.update({ id }, { ...body, category: { id: body.categoryId || foundStore.category.id } });
      if (store.affected > 0) {
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
      let foundStore = await this.storeRepo.findOneBy({ id });
      if (!foundStore) {
        throw new Error("Store is not found!")
      }
      let res = await this.storeRepo.delete({ id });
      if (res.affected > 0) {
        return {
          status: 204,
          message: "successfully deleted!"
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
