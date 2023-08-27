import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsBoolean, Length, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @Length(2)
  @IsString()
  payment_name: string;

  @Length(2)
  @IsString()
  payment_button_name: string;

  @IsBoolean()
  status: boolean
}
