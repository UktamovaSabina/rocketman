import { Module } from '@nestjs/common';
import { ComplainService } from './complain.service';
import { ComplainController } from './complain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complains } from './entities/complain.entity';
import { Users } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complains, Users])],
  controllers: [ComplainController],
  providers: [ComplainService],
})
export class ComplainModule {}
