import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({type: String})
  @IsString()
  product_name: string;

  @ApiProperty({type: String})
  @IsString()
  product_description: string

  @ApiProperty({type: String})
  @IsString()
  product_image_link: string

  @ApiProperty({type: Number})
  @IsNumber()
  product_price: number;

  @ApiProperty({type: Boolean})
  @IsBoolean()
  status: boolean;
}
