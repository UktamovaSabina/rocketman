import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsNumber, ValidateNested } from 'class-validator';

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

<<<<<<< HEAD
  @ApiProperty({ type: Array, example: [1, 2, 3], description: "array of products ID" })
=======
  @ApiProperty({ type: [ProductInfo], example: [{ "product_id": 1, "count": 2 }] })
  @IsNotEmpty()
>>>>>>> dev
  @IsArray()
  @ArrayNotEmpty()
  // @ValidateNested({ each: true })
  products: ProductInfo[];

<<<<<<< HEAD
  @ApiProperty({ type: Number, example: 1, description: "existing user ID" })
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @ApiProperty({ type: Number, example: 1, description: "existing driver ID" })
  @IsNotEmpty()
  @IsNumber()
  driver: number;
=======
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user: number;
>>>>>>> dev
}
