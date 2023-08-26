import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({type: String, example: "john"})
    @IsString()
    username: string;
  
    @ApiProperty({type: String, example: "12345678"})
    @IsString()
    password: string
}
