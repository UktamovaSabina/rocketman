import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsNumber, ValidateNested } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

enum Order_status {
  BUYURTMA = "buyurtma",
  QABUL = "qabul",
  YETKAZISH = "yetkazish",
  YAKUN = "yakun",
  BEKOR = "bekor"
}

export class UpdateOrderDto extends PartialType(CreateOrderDto)  {

  @ApiProperty({type: String, example: "qabul", description: "order status"})
  @IsEnum(Order_status)
  status: Order_status

  @ApiProperty({type: Number, example: 1, description: "existing driver ID"})
  @IsNotEmpty()
  @IsNumber()
  driver: number;
}
