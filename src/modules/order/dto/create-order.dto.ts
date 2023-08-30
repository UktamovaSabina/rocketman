import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';

class ProductInfo {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  product_id: number;

  @ApiProperty({ type: Number, example: 2 })
  @IsNumber()
  count: number;
}

export class CreateOrderDto {

  @ApiProperty({ type: String, example: "cash" })
  @IsNotEmpty()
  @IsString()
  payment_type: string;

  @ApiProperty({ type: String, example: "0000000" })
  @IsNotEmpty()
  @IsString()
  longitude: string;

  @ApiProperty({ type: String, example: "0000000" })
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiProperty({ type: [ProductInfo], example: [{ "product_id": 1, "count": 2 }] })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  products: ProductInfo[];

  @ApiProperty({ type: Number, example: 1, description: "existing user ID" })
  @IsNotEmpty()
  @IsNumber()
  user: number;
}
