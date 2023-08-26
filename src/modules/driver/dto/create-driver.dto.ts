import { IsBoolean, IsDateString, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDriverDto {
    @ApiProperty({type: String, example: "Micheal"})
    @IsString()
    @Length(2)
    driver_name: string;
  
    @ApiProperty({type: Date})
    @IsDateString()
    birth_date: Date;
  
    @ApiProperty({type: String})
    @IsString()
    @Length(13, 13)
    phone_number: string
  
    @ApiProperty({type: String})
    @IsString()
    car_number: string

    @ApiProperty({type: String})
    @IsString()
    car_type: string

    status: boolean
}
