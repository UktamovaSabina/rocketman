import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductCategoryDto {
  @IsString()
  product_category_name: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  store_id: number;

}
