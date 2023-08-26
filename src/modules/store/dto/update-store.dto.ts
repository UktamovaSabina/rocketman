import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, Length } from "class-validator";
import { CreateStoreDto } from "./create-store.dto";

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @ApiProperty({ type: String })
  @IsString()
  store_name: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(13, 13)
  phone_number: string

  @ApiProperty({ type: String })
  @IsString()
  address: string

  @ApiProperty({ type: String })
  @IsString()
  longitude: string;

  @ApiProperty({ type: String })
  @IsString()
  latitude: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  status: boolean

  categoryId?: number
}
