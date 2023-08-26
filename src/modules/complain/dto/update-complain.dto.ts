import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateComplainDto {
    @ApiProperty()
    @IsString()
    complain_text: string
}
