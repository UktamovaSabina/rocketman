import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  product_name: string;

  @IsString()
  product_description: string

  @IsString()
  product_image: string

  @IsString()
  product_image_link: string

  @IsNumber()
  product_price: number;

  @IsBoolean()
  status: boolean;
}
