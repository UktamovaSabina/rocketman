import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, Length } from "class-validator";

export class CreateStoreDto {
  @ApiProperty({ type: String, example: "adidas" })
  @IsString()
  store_name: string;

  @ApiProperty({type: String, example: "+998991112233"})
  @IsString()
  @Length(13, 13)
  phone_number: string

  @ApiProperty({type: String, example: "Chilonzor"})
  @IsString()
  address: string

  @ApiProperty({type: String, example: "1234567890"})
  @IsString()
  longitude: string;

  @ApiProperty({type: String, example: "1234567890"})
  @IsString()
  latitude: string;

  @ApiProperty({type: Number, example: false})
  @IsBoolean()
  status: boolean

  @ApiProperty({type: Number, example: 1})
  @IsNumber()
  category: number
}
