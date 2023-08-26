import { IsBoolean, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  payment_name: string;

  @IsString()
  payment_button_name: string;
}
