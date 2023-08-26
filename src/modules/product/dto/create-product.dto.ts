import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
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

  @IsNumber()
  product_category_id: number;
}
