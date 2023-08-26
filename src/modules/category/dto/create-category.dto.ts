import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({type: String, example: "clothes"})
  @IsNotEmpty()
  @IsString()
  category_name: string;
  
  @ApiProperty({type: Boolean, example: false})
  @IsNotEmpty()
  @IsBoolean()
  status: boolean
}
