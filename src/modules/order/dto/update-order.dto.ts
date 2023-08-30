import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDriverDto extends PartialType(CreateOrderDto) {

  @ApiProperty({ type: Number, example: 1, description: "existing driver ID" })
  @IsNotEmpty()
  @IsNumber()
  driver: number;
}
