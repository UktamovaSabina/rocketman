import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDto } from './create-product_category.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {
  @ApiProperty({type: String})
  @IsString()
  product_category_name: string;

  @ApiProperty({type: Boolean})
  @IsBoolean()
  status: boolean;

  @IsOptional()
  store?: number
}
