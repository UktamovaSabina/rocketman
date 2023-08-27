import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, Length } from "class-validator";

export class CreateProductCategoryDto {
  @ApiProperty({ type: String, example: "ichimliklar" })
  @IsString()
  @Length(3)
  product_category_name: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  store: number;

}
