import { Injectable, BadRequestException } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService) { }

  getAll() {
    return this.adminRepo.find()
  }

  async register(body: RegisterDto) {
    try {
      let duplicate = await this.adminRepo.findOneBy({ username: body.username });
      if (duplicate) {
        throw new Error("Username already exists!")
      }
      let user = this.adminRepo.create(body);
      await this.adminRepo.save(user)
      if (!user) {
        return new BadRequestException()
      }
      let access_token = this.jwtService.sign({ role: user.role })
      delete user.password

      return {
        status: 200,
        message: "success",
        data: user,
        token: access_token
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message
      }
    }
  }

  async login({ username, password }) {
    let user = await this.adminRepo.findOne({ where: { username, password } })
    if (!user) {
      return new BadRequestException("Password or username is wrong!")
    }
    let access_token = this.jwtService.sign({ role: user.role })
    delete user.password
    return {
      status: 200,
      message: "success",
      data: user,
      token: access_token
    }
  }

}
