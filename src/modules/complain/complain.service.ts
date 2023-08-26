import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user/entities/user.entity';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { Complains } from './entities/complain.entity';

@Injectable()
export class ComplainService {
  constructor(@InjectRepository(Complains) private readonly complainsRepo: Repository<Complains>,
    @InjectRepository(Users) private readonly userRepo: Repository<Users>
  ) { }

  async findAll() {
    return await this.complainsRepo.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    return await this.complainsRepo.findOne({
      where: { id }, relations: {user: true},
    });
  }

  async create(body: any) {
    const user = await this.userRepo.findOneBy({ id: body.user });
    if (!user) {
      throw new Error("user is not found!")
    }
    const complain = this.complainsRepo.create(body);
    await this.complainsRepo.save(complain);
    return complain
  }

  async update(id: number, body: UpdateComplainDto) {
    let foundComplain = await this.complainsRepo.findOneBy({ id });
    if (!foundComplain) {
      throw new Error("Complain is not found!")
    }
    return await this.complainsRepo.update({ id }, body);
  }

  async delete(id: number) {
    let foundComplain = await this.complainsRepo.findOneBy({ id });
    if (!foundComplain) {
      throw new Error("Complain is not found!")
    }
    return await this.complainsRepo.delete({ id });
  }
}
