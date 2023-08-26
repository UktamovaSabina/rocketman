import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDto } from './create-product_category.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {
  @IsString()
  product_category_name: string;

  @IsBoolean()
  status: boolean;
}
