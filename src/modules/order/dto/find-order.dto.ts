import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class FindOrderStatus extends PartialType(CreateOrderDto)  {
  @ApiProperty({type: String, example: "barchasi", description: "order status"})
  @IsString()
  status: string
}

