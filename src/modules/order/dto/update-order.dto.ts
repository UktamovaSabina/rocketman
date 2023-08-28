import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

enum Order_status {
  BUYURTMA = "buyurtma",
  QABUL = "qabul",
  YETKAZISH = "yetkazish",
  YAKUN = "yakun",
  BEKOR = "bekor"
}

export class UpdateOrderDriverDto extends PartialType(CreateOrderDto)  {

  @ApiProperty({type: Number, example: 1, description: "existing driver ID"})
  @IsNotEmpty()
  @IsNumber()
  driver: number;
}
