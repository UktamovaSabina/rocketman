import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty({type: String, example: "coca cola"})
  @IsNotEmpty()
  @IsString()
  @Length(3)
  product_name: string;
  
  @ApiProperty({type: String, example: "0.5 litrli"})
  @IsNotEmpty()
  @IsString()
  @Length(5)
  product_description: string
  
  @ApiProperty({type: String, example: "https://www.youtube.com/..."})
  @IsNotEmpty()
  @IsString()
  @Length(5)
  product_image_link: string
  
  @ApiProperty({type: Number, example: 5000})
  @IsNotEmpty()
  @IsNumber()
  product_price: number;
  
  @ApiProperty({type: Boolean, example: true})
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
  
  @ApiProperty({type: Number, example: 1})
  @IsNotEmpty()
  @IsNumber()
  productCategory: number;
}
