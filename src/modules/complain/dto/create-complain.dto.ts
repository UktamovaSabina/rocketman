import { IsDefined, IsNumber, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateComplainDto {
    @ApiProperty({type: String, example: "I want my food to be delivered faster"})
    @IsDefined()
    @IsString()
    @Length(2)
    complain_text: string

    @ApiProperty({type: Number})
    @IsNumber()
    user: number
}
