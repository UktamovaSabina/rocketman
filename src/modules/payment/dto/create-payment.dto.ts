import { ApiProperty } from "@nestjs/swagger";
import { Length, IsBoolean, IsString } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({ type: String, example: "click" })
  @Length(2)
  @IsString()
  payment_name: string;

  @ApiProperty({ type: String, example: "click" })
  @Length(2)
  @IsString()
  payment_button_name: string;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  status: boolean
}
