import { IsBoolean } from "class-validator";

export class UpdatePaymentStatusDto {
  @IsBoolean()
  status: boolean
}