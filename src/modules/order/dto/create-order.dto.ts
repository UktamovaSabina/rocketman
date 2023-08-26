import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

enum Order_status {
  BUYURTMA = "buyurtma",
  QABUL = "qabul",
  YETKAZISH = "yetkazish",
  YAKUN = "yakun",
  BEKOR = "bekor"
}

export class CreateOrderDto {
  @ApiProperty({ type: Order_status })
  @IsNotEmpty()
  @IsEnum(Order_status)
  status: Order_status;

  @ApiProperty({type: String, example: "cash"})
  @IsNotEmpty()
  @IsString()
  payment_type: string;

  @ApiProperty({type: String, example: "0000000"})
  @IsNotEmpty()
  @IsString()
  longitude: string;

  @ApiProperty({type: String, example: "0000000"})
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiProperty({type: Array, example: [1, 2, 3], description: "array of products ID"})
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber()
  products: number[];

  @ApiProperty({type: Number, example: 1, description: "existing user ID"})
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @ApiProperty({type: Number, example: 1, description: "existing driver ID"})
  @IsNotEmpty()
  @IsNumber()
  driver: number;
}
