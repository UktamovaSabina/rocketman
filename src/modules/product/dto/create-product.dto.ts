import { IsBoolean, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @IsString()
  @Length(3)
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
  productCategory: number;
}
