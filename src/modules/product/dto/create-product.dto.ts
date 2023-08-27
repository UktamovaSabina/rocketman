import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ type: String, example: "coca cola" })
  @IsNotEmpty()
  @IsString()
  @Length(3)
  product_name: string;

  @ApiProperty({ type: String, example: "0.5 litrli" })
  @IsNotEmpty()
  @IsString()
  @Length(5)
  product_description: string

  @ApiProperty({ type: String, example: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.kfc.nl%2FContent%2FOnlineOrderingImages%2FMenu%2FItems%2Flg2x%2Foriginal-bucket-combo.jpg%3Fv%3D4.2&tbnid=d1dvjVQ0dMY5KM&vet=12ahUKEwipoLWF3P2AAxWKDxAIHbzQAhUQMygHegQIARBg..i&imgrefurl=https%3A%2F%2Fwww.kfc.nl%2Fmenu%2Foverview&docid=sn5dlelqAaMGIM&w=480&h=388&q=kfc&ved=2ahUKEwipoLWF3P2AAxWKDxAIHbzQAhUQMygHegQIARBg" })
  @IsNotEmpty()
  @IsString()
  @Length(5)
  product_image_link: string

  @ApiProperty({ type: Number, example: 5000 })
  @IsNotEmpty()
  @IsNumber()
  product_price: number;

  @ApiProperty({ type: Boolean, example: true })
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  @IsNumber()
  productCategory: number;
}
