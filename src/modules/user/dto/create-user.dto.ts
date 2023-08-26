import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({type: Number, example: 1})
    @IsNumber()
    id: number

    @ApiProperty({type: String, example: "John"})
    @IsDefined()
    @IsString()
    @Length(2)
    firstname: string

    @ApiProperty({type: String, example: "Doe"})
    @IsString()
    lastname: string

    @ApiProperty({type: String, example: "+998901112233"})
    @IsDefined()
    @IsString()
    @Length(13, 13)
    phone_number: string
}
